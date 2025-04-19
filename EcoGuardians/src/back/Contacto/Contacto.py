from flask import Flask, jsonify, request,json
from flask_cors import CORS
from simple_salesforce import Salesforce
from datetime import datetime
import logging
from logging.handlers import RotatingFileHandler
import os
import requests

app = Flask(__name__)
app.secret_key = "clave_secreta_super_segura"  # Necesario para usar sesiones


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

CORS(app, origins=["http://localhost:3000"]) 

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


@app.route('/api/data', methods=['GET'])
def get_data():
    response_data = {
        'message': 'Hola desde el backend!',
        'salesforce_connection': sf_connection_status
    }
    print("\n--- [GET] /api/data ---")
    print(f"Response: {response_data}")
    return jsonify(response_data)


@app.route('/contacto', methods=['POST'])
def create_payment():
    logger.info("\n--- [POST] /contacto ---")
    data = request.json
    logger.info(f"📩 Datos recibidos: {data}")

    name = data.get("name")
    email = data.get("username")
    age_range = data.get("ageRange")
    country = data.get("country", "")
    region = data.get("region", "")
    fecha_registro = datetime.now()

    if not email or not name or not age_range or not country or not region:
        error_msg = "Nombre, correo, país, región y rango de edad son obligatorios"
        logger.error(f"❌ Validación fallida: {error_msg}")
        return jsonify({"error": error_msg}), 400

    response_data = {
        'message': 'Registro procesado correctamente',
        'salesforce': {
            'record_created': False,
            'error': None
        }
    }

    if sf_connection_status['connected']:
        try:
            logger.info("🔄 Intentando crear Contact en Salesforce...")

            # ID de la Queue de Contact (lo copias desde Salesforce)
            queue_id = "00GgK000000vn5d"  

            contact_data = {
                'nombre_completo__c': name,
              
                'email_usuario__c': email,
                'age_range__c': age_range,
                'Country__c': country,
                'Region__c': region,
                'OwnerId': "00GgK000000vn5d"
            }

            response = sf.ContactRequest.create(contact_data)

            if response.get('success'):
                record_id = response.get('id')
                response_data['salesforce'].update({
                    'record_created': True,
                    'record_id': record_id
                })
                logger.info(f"✅ Contact creado en Salesforce. ID: {record_id}")
            else:
                error_msg = str(response.get('errors', 'Error desconocido'))
                response_data['salesforce']['error'] = error_msg
                logger.error(f"❌ Error al crear Contact: {error_msg}")

        except Exception as sf_error:
            error_msg = str(sf_error)
            response_data['salesforce']['error'] = error_msg
            logger.error(f"❌ Excepción Salesforce: {error_msg}")

    else:
        response_data['salesforce']['error'] = "No conectado a Salesforce"
        logger.error("❌ No conectado a Salesforce")

    logger.info(f"📊 Response final: {response_data}")
    return jsonify(response_data)

if __name__ == '__main__':
    print("\n🚀 Iniciando servidor Flask...")
    app.run(debug=True)