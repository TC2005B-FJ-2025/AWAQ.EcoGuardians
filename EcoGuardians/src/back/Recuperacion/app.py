# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL
from flask_mail import Mail, Message
from datetime import datetime, timedelta
import secrets
import string
import random
import os
import traceback

app = Flask(__name__)
bcrypt = Bcrypt(app)

# Configuración de CORS
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Configuración de MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'awaq__db'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

# Configuración de Flask-Mail (usa las credenciales de tu cuenta)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'c3170600@gmail.com'
app.config['MAIL_PASSWORD'] = 'phcj ftkb bher itvh'
app.config['MAIL_DEFAULT_SENDER'] = app.config['MAIL_USERNAME']
mail = Mail(app)

# Función para generar un código de verificación de 6 dígitos alfanumérico
def generate_verification_code(length=6):
    characters = string.ascii_uppercase + string.digits
    return ''.join(random.choices(characters, k=length))

@app.route('/api/healthcheck', methods=['GET'])
def healthcheck():
    return jsonify({"status": "OK", "message": "Flask backend is running"})

@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    cursor = None
    try:
        data = request.get_json()
        if not data or 'email' not in data:
            return jsonify({"error": "Email is required"}), 400

        email = data['email']
        print(f"Processing password reset for: {email}")

        cursor = mysql.connection.cursor()
        # Se asume que la columna "username" almacena el correo
        cursor.execute("SELECT username FROM users WHERE username = %s", (email,))
        user = cursor.fetchone()

        if user:
            username = user['username']
            token = generate_verification_code(6)
            # Verificar que el token no esté en uso
            cursor.execute("SELECT token FROM sessions WHERE token = %s", (token,))
            while cursor.fetchone() is not None:
                token = generate_verification_code(6)
                cursor.execute("SELECT token FROM sessions WHERE token = %s", (token,))
            
            expires_at = datetime.now() + timedelta(minutes=15)
            cursor.execute("""
                INSERT INTO sessions (username, token, expiresAt)
                VALUES (%s, %s, %s)
                ON DUPLICATE KEY UPDATE
                token = VALUES(token),
                expiresAt = VALUES(expiresAt)
            """, (username, token, expires_at))
            mysql.connection.commit()

            # Enviar el código por email
            msg = Message(
                subject="Código de Verificación para Restablecer Contraseña",
                recipients=[email]
            )
            msg.body = (
                f"Hola,\n\n"
                f"Tu código de verificación es: {token}\n\n"
                f"Este código expira en 15 minutos.\n\n"
                f"Saludos,\n"
                f"El equipo de EcoGuardians"
            )
            mail.send(msg)
            print(f"Verification code for {email}: {token}")

            return jsonify({
                "success": True,
                "message": "If this email exists in our system, you will receive a verification code"
            }), 200

        return jsonify({
            "success": True,
            "message": "If this email exists in our system, you will receive a verification code"
        }), 200

    except Exception as e:
        traceback.print_exc()
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": "Server error processing your request"}), 500
    finally:
        if cursor:
            cursor.close()

@app.route('/api/verify-code', methods=['POST'])
def verify_code():
    cursor = None
    try:
        data = request.get_json()
        token = data.get('token')
        if not token:
            return jsonify({"success": False, "error": "No se proporcionó un código"}), 400
        
        cursor = mysql.connection.cursor()
        cursor.execute("""
            SELECT username FROM sessions 
            WHERE token = %s AND expiresAt > NOW()
        """, (token,))
        result = cursor.fetchone()
        cursor.close()
        
        if result:
            return jsonify({"success": True})
        else:
            return jsonify({"success": False, "error": "Código inválido o expirado"}), 400
    except Exception as e:
        traceback.print_exc()
        if cursor:
            cursor.close()
        return jsonify({"success": False, "error": "Error interno del servidor"}), 500

@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    cursor = None
    try:
        data = request.get_json()
        if not data or 'token' not in data or 'new_password' not in data:
            return jsonify({"error": "Token and new password are required"}), 400
        
        cursor = mysql.connection.cursor()
        cursor.execute("""
            SELECT username FROM sessions 
            WHERE token = %s AND expiresAt > NOW()
        """, (data['token'],))
        result = cursor.fetchone()

        if not result:
            return jsonify({
                "success": False,
                "error": "Invalid or expired token"
            }), 400

        username = result['username']
        hashed_password = bcrypt.generate_password_hash(data['new_password']).decode('utf-8')
        cursor.execute("""
            UPDATE users SET password = %s 
            WHERE username = %s
        """, (hashed_password, username))
        cursor.execute("DELETE FROM sessions WHERE username = %s", (username,))
        mysql.connection.commit()

        return jsonify({
            "success": True,
            "message": "Password updated successfully"
        }), 200

    except Exception as e:
        traceback.print_exc()
        mysql.connection.rollback()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
    finally:
        if cursor:
            cursor.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
