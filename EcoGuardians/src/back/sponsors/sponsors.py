from flask import Flask, jsonify, request
from flask_cors import CORS
from simple_salesforce import Salesforce
import logging
from logging.handlers import RotatingFileHandler
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"]) 

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


# Configuración de Salesforce
sf = None
sf_connection_status = {
    'connected': False,
    'error': None
}

try:
    sf = Salesforce(
        username='c3170600750@agentforce.com',
        password='salesforcin2',
        security_token='G0dXIw88ZtgYjiHNllRZ9gpHF',
        consumer_key='3MVG9rZjd7MXFdLhTtQ3o7490SYfft0KQKGUGhfDAdo9IH8TvkFVU7ZbP51y9n42LRAPsKJXiHkAtvEuwZ.rK',
        consumer_secret='DB514D96E146B86A35C94684D7632DB0F3D659741F42AC04C9437DEA1E9D1AB7'
    )
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


@app.route('/sponsors', methods=['POST'])
def create_payment():
    logger.info("\n--- [POST] /registro ---")
    data = request.json
    logger.info(f"📩 Datos recibidos: {data}")
    name = data.get("name")
    email = data.get("email")
    url = data.get("url")
    razones = data.get("razones")
    

    if not email or not url or not name or not razones :
        error_msg = "Correo, url, nombre y descripción del por qué son campos obligatorios"
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
                'Name': name,
              
                'email_usuario__c': email,
                'liga__c':url,
                'razones__c':razones,

                'OwnerId': "00GgK000000vn5d"
            }

            response = sf.Sponsor__c.create(contact_data)

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