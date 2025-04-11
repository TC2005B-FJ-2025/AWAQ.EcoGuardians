from flask import Flask, jsonify, request
from flask_cors import CORS
from simple_salesforce import Salesforce
import logging
from logging.handlers import RotatingFileHandler
import os

# Inicialización de la app Flask
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Ajusta si tu frontend está en otra URL

# Configuración de logs
if not os.path.exists('logs'):
    os.makedirs('logs')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        RotatingFileHandler('logs/app.log', maxBytes=5 * 1024 * 1024, backupCount=5),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Conexión a Salesforce
sf = None
try:
    sf = Salesforce(
        username='c3170600750@agentforce.com',
        password='salesforcin2',
        security_token='G0dXIw88ZtgYjiHNllRZ9gpHF',
        consumer_key='3MVG9rZjd7MXFdLhTtQ3o7490SYfft0KQKGUGhfDAdo9IH8TvkFVU7ZbP51y9n42LRAPsKJXiHkAtvEuwZ.rK',
        consumer_secret='DB514D96E146B86A35C94684D7632DB0F3D659741F42AC04C9437DEA1E9D1AB7'
    )
    logger.info("Conectado a Salesforce exitosamente")
except Exception as e:
    logger.error(f"Error al conectar con Salesforce: {e}")

# Ruta para recibir la puntuación
@app.route('/valoracion', methods=['POST'])
def recibir_valoracion():
    data = request.get_json()
    logger.info(f"Valoración recibida: {data}")

    puntuacion = data.get("puntuacion")
    nombre = data.get("nombre", "Valoración Anónima")  # Si no se proporciona un nombre, usamos uno por defecto

    if not puntuacion or not isinstance(puntuacion, int):
        logger.warning("Puntuación inválida")
        return jsonify({"error": "Puntuación inválida"}), 400

    try:
        # Crear el registro en Salesforce, asegurando que se incluya el campo obligatorio 'Name'
        respuesta = sf.Scorecard.create({
            'Name': nombre,  # Asignamos un nombre por defecto o el proporcionado
            'Puntuacion__c': puntuacion,
            'OwnerId': "00GgK000000vn5d",
            # Aquí puedes agregar más campos si es necesario
        })

        if respuesta.get("success"):
            logger.info(f"Registro creado en Salesforce con ID {respuesta['id']}")
            return jsonify({"mensaje": "Valoración enviada correctamente"}), 200
        else:
            logger.error(f"Error al crear registro: {respuesta}")
            return jsonify({"error": "Error al crear registro en Salesforce"}), 500

    except Exception as e:
        logger.error(f"Excepción al guardar en Salesforce: {e}")
        return jsonify({"error": "Error del servidor"}), 500

# Iniciar servidor
if __name__ == '__main__':
    logger.info("Iniciando servidor Flask en modo desarrollo")
    app.run(debug=True)