from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = "clave_secreta_super_segura"  # Necesario para usar sesiones
bcrypt = Bcrypt(app)

# Configurar CORS para permitir solo peticiones desde el frontend en desarrollo
CORS(app)

# Configuración de la base de datos MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'awaq2'

mysql = MySQL(app)


# Ruta para el login de administradores
@app.route("/loginAdmin", methods=["POST"])
def login_admin():
    try:
        data = request.json
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"error": "Faltan datos"}), 400

        cur = mysql.connection.cursor()

        # Verificar si el usuario existe y es admin
        cur.execute("SELECT password, role, active FROM users WHERE Username = %s", (username,))
        usuario_db = cur.fetchone()

        cur.close()

        if usuario_db is None:
            return jsonify({"error": "Usuario o contraseña incorrectos"}), 401

        password_hash, role, active = usuario_db

        # Verificar la contraseña
        if not bcrypt.check_password_hash(password_hash, password):
            return jsonify({"error": "Usuario o contraseña incorrectos"}), 401

        # Verificar si es administrador
        if role.lower() != "admin":
            return jsonify({"error": "Acceso denegado. No eres administrador."}), 403

        # Verificar si la cuenta está activa
        if active != 1:
            return jsonify({"error": "Cuenta desactivada. Contacta al administrador."}), 403

        # Guardar la sesión del usuario (opcional)
        session["user"] = username
        session["role"] = role

        return jsonify({"message": "Inicio de sesión exitoso", "username": username}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
