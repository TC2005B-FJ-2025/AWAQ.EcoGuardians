from flask import Flask, request, jsonify, session, json
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL
import requests

app = Flask(__name__)
app.secret_key = "clave_secreta_super_segura"  # Necesario para usar sesiones
bcrypt = Bcrypt(app)

# Configurar CORS para permitir peticiones desde el frontend en desarrollo
CORS(app)

# Configuración de la base de datos MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'awaq__db'

mysql = MySQL(app)

def is_human(captcha_response):
    """
    Validating recaptcha response from google server
    Returns True if captcha test passed for submitted form else returns False.
    """
    # CLAVE SECRETA de reCAPTCHA
    secret = "6Le0DgYrAAAAAOk8n4K8mMq6WmDGPCNxpfZpCYsS"
    payload = {'response': captcha_response, 'secret': secret}
    response = requests.post("https://www.google.com/recaptcha/api/siteverify", payload)
    response_text = json.loads(response.text)
    return response_text['success']

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("username", "").strip()
        password = data.get("password", "")
        
        if not email or not password:
            return jsonify({"error": "Correo y contraseña son obligatorios"}), 400

        cur = mysql.connection.cursor()  # Sin parámetro dictionary
        
        cur.execute("""
            SELECT u.password, u.role, u.active, ud.name 
            FROM Users u
            JOIN UsersData ud ON u.username = ud.username
            WHERE u.username = %s
            LIMIT 1
        """, (email,))
        
        user = cur.fetchone()
        cur.close()

        if not user:
            return jsonify({"error": "Credenciales incorrectas"}), 401

        # Convertir tupla a diccionario manualmente
        user_dict = {
            'password': user[0],
            'role': user[1],
            'active': user[2],
            'name': user[3]
        }
        
        if not bcrypt.check_password_hash(user_dict['password'], password):
            return jsonify({"error": "Credenciales incorrectas"}), 401

        return jsonify({
            "message": "Login exitoso",
            "user": {
                "email": email,
                "name": user_dict['name'],
                "role": user_dict['role']
            }
        }), 200

    except Exception as e:
        print(f"Error en login: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)