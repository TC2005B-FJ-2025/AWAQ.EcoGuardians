from flask import Flask, jsonify, request
from flask_cors import CORS
from simple_salesforce import Salesforce
import logging
from logging.handlers import RotatingFileHandler
import os
import json

# Inicialización de la app Flask
app = Flask(__name__)
# Ruta ABSOLUTA al config.json (la más segura)
#CONFIG_PATH = r'C:\Users\HP\Desktop\desarrollo\awaq2\AWAQ.EcoGuardians\EcoGuardians\json\config.json'

# O si prefieres ruta relativa (desde paypal.py):
CONFIG_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'json', 'config.json'))

# Verificación adicional
if not os.path.exists(CONFIG_PATH):
    raise FileNotFoundError(f"❌ No se encontró config.json en: {CONFIG_PATH}")

# Cargar configuración
with open(CONFIG_PATH, 'r', encoding='utf-8') as config_file:
    config = json.load(config_file)

print(f"✅ Configuración cargada correctamente desde: {CONFIG_PATH}")

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

# Configuración Salesforce
sf = None
sf_connection_status = {'connected': False, 'error': None}

try:
    sf = Salesforce(**config['salesforce'])  # Desempaqueta automáticamente las credenciales
    sf.query("SELECT Id FROM User LIMIT 1")
    sf_connection_status = {'connected': True, 'error': None}
    print("\n✅ [SALESFORCE] Conexión exitosa")
except Exception as e:
    sf_connection_status = {'connected': False, 'error': str(e)}
    print(f"\n❌ [SALESFORCE] Error de conexión: {e}")

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