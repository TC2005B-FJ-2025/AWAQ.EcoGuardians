from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

# Configuración de la base de datos MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'awaq__db'

mysql = MySQL(app)

@app.route("/api/administradores", methods=["GET"])
def obtener_administradores():
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            SELECT u.username, ud.name, ud.minAge, ud.country, ud.region, 
                   ud.creationDate, u.active
            FROM Users u
            JOIN UsersData ud ON u.username = ud.username
            WHERE u.role = 'admin'
            ORDER BY u.active DESC, ud.creationDate DESC
        """)
        administradores = cur.fetchall()
        cur.close()
        
        admins_list = []
        for admin in administradores:
            admins_list.append({
                'username': admin[0],
                'name': admin[1],
                'minAge': admin[2],
                'country': admin[3],
                'region': admin[4],
                'creationDate': admin[5].strftime('%Y-%m-%d'),
                'active': bool(admin[6])
            })
        
        return jsonify(admins_list)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/administradores", methods=["POST"])
def agregar_administrador():
    try:
        # Verificar que el contenido sea JSON
        if not request.is_json:
            return jsonify({"error": "El contenido debe ser JSON"}), 400
            
        data = request.get_json()
        
        # Validar datos requeridos
        required_fields = ['name', 'username', 'password', 'age_range', 'country', 'region']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Faltan campos requeridos"}), 400

        # Validar longitud mínima de contraseña
        if len(data['password']) < 6:
            return jsonify({"error": "La contraseña debe tener al menos 6 caracteres"}), 400

        # Mapeo de rangos de edad
        age_mapping = {
            '0-12': 12,
            '13-17': 17,
            '18-25': 25,
            '26-35': 35,
            '36-50': 50,
            '51+': 99
        }
        min_age = age_mapping.get(data['age_range'], 25)

        # Verificar si el usuario existe
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Users WHERE username = %s", (data['username'],))
        if cur.fetchone():
            cur.close()
            return jsonify({"error": "El nombre de usuario ya existe"}), 400

        # Encriptar contraseña
        password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')

        # Insertar en la base de datos
        cur.execute("""
            INSERT INTO Users (username, password, role, active)
            VALUES (%s, %s, %s, %s)
        """, (data['username'], password_hash, 'admin', 1))

        cur.execute("""
            INSERT INTO UsersData (username, name, minAge, country, region, creationDate)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (data['username'], data['name'], min_age, data['country'], data['region'], datetime.now()))

        mysql.connection.commit()
        cur.close()

        return jsonify({
            "message": "Administrador agregado exitosamente",
            "username": data['username']
        }), 201

    except Exception as e:
        print("Error en el servidor:", str(e))
        return jsonify({"error": "Error interno del servidor"}), 500
    
@app.route("/api/administradores/<username>", methods=["DELETE"])
def eliminar_administrador(username):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM UsersData WHERE username = %s", (username,))
        cur.execute("DELETE FROM Users WHERE username = %s", (username,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Administrador eliminado exitosamente"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/administradores/<username>/estado", methods=["PUT"])
def cambiar_estado(username):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT active FROM Users WHERE username = %s", (username,))
        current_status = cur.fetchone()[0]
        new_status = not current_status
        
        cur.execute("UPDATE Users SET active = %s WHERE username = %s", (new_status, username))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Estado actualizado", "active": new_status})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)