from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL
from datetime import datetime
from flask_mail import Mail, Message
import logging
from logging.handlers import RotatingFileHandler
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app, origins=["http://localhost:3000"])

# Configuración de logs
if not os.path.exists('logs'):
    os.makedirs('logs')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        RotatingFileHandler('logs/awaq.log', maxBytes=1024*1024*5, backupCount=5),  # 5 MB por archivo, 5 backups
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Configuración de MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'awaq__db'
app.config['SECRET_KEY'] = "tsfyguaistyatuis589566875623568956"
app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = "awaq.pruebas@gmail.com"
app.config['MAIL_PASSWORD'] = "xuvr lstw tncf upny"

mail = Mail(app)
mysql = MySQL(app)

def log_request_response(request, response=None, error=None):
    """Registra detalles de la solicitud y respuesta"""
    log_data = {
        'method': request.method,
        'path': request.path,
        'ip': request.remote_addr,
        'params': request.args,
        'json': request.json if request.is_json else None,
        'response': response,
        'error': error
    }
    logger.info(f"Request/Response: {log_data}")

def age_range_to_min_age(age_range):
    """Convierte un rango de edad a la edad mínima correspondiente para la BD"""
    mapping = {
        '0-12': 12,
        '13-17': 17,
        '18-25': 25,
        '26-35': 35,
        '36-50': 50,
        '51+': 99
    }
    return mapping.get(age_range, 25)  # Default to 25 (18-25)

def min_age_to_age_range(min_age):
    """Convierte la edad mínima de la BD a un rango de edad legible"""
    mapping = {
        12: '0-12',
        17: '13-17',
        25: '18-25',
        35: '26-35',
        50: '36-50',
        99: '51+'
    }
    return mapping.get(min_age, '18-25')  # Default to 18-25

@app.route("/registro", methods=["POST"])
def signup():
    try:
        logger.info("\n--- [POST] /registro ---")
        data = request.json
        logger.info(f"📩 Datos recibidos: {data}")

        name = data.get("name")
        email = data.get("username")
        password = data.get("password")
        role = data.get("role", "user")
        age_range = data.get("ageRange")
        country = data.get("country", "")
        region = data.get("region", "")
        fecha_registro = datetime.now()

        # Validaciones
        if not email or not password or not name or not age_range:
            error_msg = "Nombre, correo, contraseña y rango de edad son obligatorios"
            logger.error(f"❌ Validación fallida: {error_msg}")
            response = jsonify({"error": error_msg}), 400
            log_request_response(request, response)
            return response

        if len(password) < 6:
            error_msg = "La contraseña debe tener al menos 6 caracteres"
            logger.error(f"❌ Validación fallida: {error_msg}")
            response = jsonify({"error": error_msg}), 400
            log_request_response(request, response)
            return response

        # Convertir el rango de edad a la edad mínima para la BD
        min_age = age_range_to_min_age(age_range)
        logger.info(f"🔢 Conversión de rango de edad: {age_range} -> {min_age}")

        cur = mysql.connection.cursor()
        
        # Verificar si el usuario ya existe
        cur.execute("SELECT * FROM Users WHERE username = %s", (email,))
        if cur.fetchone():
            error_msg = "El correo ya está registrado"
            logger.error(f"❌ Usuario ya existe: {email}")
            response = jsonify({"error": error_msg}), 409
            log_request_response(request, response)
            return response

        # Hash de la contraseña
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        logger.info("🔒 Contraseña hasheada correctamente")

        # Insertar en la base de datos
        cur.execute("INSERT INTO Users (username, password, role, active) VALUES (%s, %s, %s, %s)", 
                   (email, password_hash, role, True))
        
        cur.execute("""INSERT INTO UsersData 
                      (username, name, minAge, country, region, creationDate) 
                      VALUES (%s, %s, %s, %s, %s, %s)""", 
                   (email, name, min_age, country, region, fecha_registro))

        mysql.connection.commit()
        logger.info("💾 Datos guardados en la base de datos")

        # Enviar correo electrónico de bienvenida
        try:
            msg = Message(
                "Bienvenido a REBWAR AI",
                sender="noreply@app.com",
                recipients=[email]
            )
            msg.body = f"Hola {name},\n\nGracias por registrarte a awaq. Estamos emocionados de tenerte con nosotros.\n\nSaludos,\nHANNAH"
            mail.send(msg)
            logger.info(f"✉️ Correo de bienvenida enviado a: {email}")
        except Exception as e:
            logger.error(f"❌ Error al enviar correo: {str(e)}")

        cur.close()

        response = jsonify({
            "mensaje": "Usuario registrado exitosamente",
            "ageRange": age_range
        }), 201
        log_request_response(request, response)
        return response

    except Exception as e:
        error_msg = str(e)
        logger.error(f"❌ Error en /registro: {error_msg}", exc_info=True)
        response = jsonify({"error": error_msg}), 500
        log_request_response(request, response, error=error_msg)
        return response

@app.route("/api/administradores", methods=["GET"])
def obtener_administradores():
    try:
        logger.info("\n--- [GET] /api/administradores ---")
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
                'ageRange': min_age_to_age_range(admin[2]),
                'country': admin[3],
                'region': admin[4],
                'creationDate': admin[5].strftime('%Y-%m-%d'),
                'active': bool(admin[6])
            })
        
        logger.info(f"📊 Administradores encontrados: {len(admins_list)}")
        response = jsonify(admins_list)
        log_request_response(request, response)
        return response
    
    except Exception as e:
        error_msg = str(e)
        logger.error(f"❌ Error en /api/administradores: {error_msg}", exc_info=True)
        response = jsonify({"error": error_msg}), 500
        log_request_response(request, response, error=error_msg)
        return response

@app.route("/health", methods=["GET"])
def health_check():
    try:
        logger.info("\n--- [GET] /health ---")
        # Verificar conexión a MySQL
        cur = mysql.connection.cursor()
        cur.execute("SELECT 1")
        cur.close()
        
        # Verificar conexión a Mail
        with mail.connect() as conn:
            pass
            
        response = jsonify({
            "status": "healthy",
            "mysql": "connected",
            "mail": "connected",
            "timestamp": datetime.now().isoformat()
        })
        logger.info("✅ Health check exitoso")
        log_request_response(request, response)
        return response
        
    except Exception as e:
        error_msg = str(e)
        logger.error(f"❌ Health check fallido: {error_msg}")
        response = jsonify({
            "status": "unhealthy",
            "error": error_msg,
            "timestamp": datetime.now().isoformat()
        }), 500
        log_request_response(request, response, error=error_msg)
        return response

if __name__ == "__main__":
    logger.info("\n🚀 Iniciando servidor Flask...")
    try:
        app.run(host="0.0.0.0", port=5000, debug=True)
    except Exception as e:
        logger.critical(f"❌ Error al iniciar el servidor: {str(e)}", exc_info=True)
        raise