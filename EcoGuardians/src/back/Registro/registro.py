from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL
from datetime import datetime

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)  # Permitir CORS desde cualquier origen

# Configuración de la base de datos MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'awaq__db'

mysql = MySQL(app)

@app.route("/registro", methods=["POST"])
def signup():
    try:
        # Obtener los datos del JSON enviado en la solicitud
        data = request.json
        username = data.get("username")  # Nuevo identificador en lugar de correo
        password = data.get("password")
        role = data.get("role", "user")  # Se asigna un rol por defecto
        name = data.get("name")
        min_age = data.get("minAge")
        country = data.get("country")
        region = data.get("region")
        fecha_registro = datetime.now()

        # Verificar si el username ya existe
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Users WHERE username = %s", (username,))
        user_exists = cur.fetchone()

        if user_exists:
            return jsonify({"error": "El nombre de usuario ya está registrado"}), 409

        # Encriptar la contraseña
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        # Insertar en la tabla Users
        cur.execute("""
            INSERT INTO Users (username, password, role, active)
            VALUES (%s, %s, %s, %s)
        """, (username, password_hash, role, True))

        # Insertar en la tabla UsersData
        cur.execute("""
            INSERT INTO UsersData (username, name, minAge, country, region, creationDate)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (username, name, min_age, country, region, fecha_registro))

        mysql.connection.commit()
        cur.close()

        return jsonify({"mensaje": "Usuario registrado exitosamente"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
