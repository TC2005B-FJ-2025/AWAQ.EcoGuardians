from flask import Flask, jsonify, request,json
from flask_cors import CORS
from simple_salesforce import Salesforce
from datetime import datetime
import logging
from logging.handlers import RotatingFileHandler
import os
import requests
import paypalrestsdk
from flask_mail import Mail, Message
import re
from urllib.parse import quote


# Configuracion de app de flask -----------------------------------------------------------------------------------------------------------
app = Flask(__name__)
app.secret_key = "clave_secreta_super_segura"  # Necesario para usar sesiones

# Ruta ABSOLUTA al config.json (la más segura)
#CONFIG_PATH = r'C:\Users\HP\Desktop\desarrollo\awaq2\AWAQ.EcoGuardians\EcoGuardians\json\config.json'

# O si prefieres ruta relativa (desde paypal.py):
CONFIG_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__),  '..', '..', 'json', 'config.json'))

# Verificación adicional
if not os.path.exists(CONFIG_PATH):
    raise FileNotFoundError(f"❌ No se encontró config.json en: {CONFIG_PATH}")

# Cargar configuración
with open(CONFIG_PATH, 'r', encoding='utf-8') as config_file:
    config = json.load(config_file)

print(f"✅ Configuración cargada correctamente desde: {CONFIG_PATH}")

CORS(app, origins=["http://localhost:3000"]) 

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


# Configuracion de paypal -----------------------------------------------------------------------------------------------------------
# Configuración de email
app.config.update(
    MAIL_SERVER=config['email']['mail_server'],
    MAIL_PORT=config['email']['mail_port'],
    MAIL_USE_TLS=True,
    MAIL_USERNAME=config['email']['mail_username'],
    MAIL_PASSWORD=config['email']['mail_password']
)

# Inicializar Flask-Mail
mail = Mail(app)

# Configuración PayPal
paypalrestsdk.configure(config['paypal'])  # Usa todo el bloque PayPal del JSON

# Configuraccion de captcha -----------------------------------------------------------------------------------------------------------
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

# Configuracion de logs -----------------------------------------------------------------------------------------------------------

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


# Metodos de rangos de edad -----------------------------------------------------------------------------------------------------------
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

# Funcion de validacion de email -----------------------------------------------------------------------------------------------------------
def validate_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

# Contacto -----------------------------------------------------------------------------------------------------------

@app.route('/contacto', methods=['POST'])
def create_contact():
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
        logger.error(f"Validación fallida: {error_msg}")
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
            logger.info("Creando contacto en Salesforce...")

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
                logger.error(f"Error al crear Contact: {error_msg}")

        except Exception as sf_error:
            error_msg = str(sf_error)
            response_data['salesforce']['error'] = error_msg
            logger.error(f"Excepción Salesforce: {error_msg}")

    else:
        response_data['salesforce']['error'] = "No conectado a Salesforce"
        logger.error("No conectado a Salesforce")

    logger.info(f"📊 Response final: {response_data}")
    return jsonify(response_data)

# Casos ----------------------------------------------------------------

@app.route('/crear-caso', methods=['POST'])
def crear_caso():
    logger.info("\n--- [POST] /Crear-Caso ---")
    # Obtener datos del formulario
    data = request.json  # Usamos request.json para obtener los datos en formato JSON
    subject = data.get('subject')
    description = data.get('description')
    priority = data.get('priority')
    nombre_usuario = data.get('nombre_usuario')
    supplied_email = data.get('supplied_email')
    tipo_opinion = data.get('tipo_opinion')
    opiniones_sugerencias = data.get('opiniones_sugerencias')

    # Crear un nuevo caso en Salesforce
    try:
        response = sf.Case.create({
           # 'Subject': subject,
            #'Description': description,
            #'Priority': priority,
            'Status': 'New',  # Estado inicial del caso
            #'nombre_usuario__c': nombre_usuario,  # Campo personalizado
            'SuppliedEmail': supplied_email,  # Campo corregido
            'Tipo_Opinion__c': tipo_opinion,  # Campo personalizado
            'Opiniones_Sugerencias__c': opiniones_sugerencias,  # Campo personalizado
            'OwnerId': "00GgK000000vn5d"
        })
        # print("Caso creado con éxito:", response)
        logger.info("Caso creado con éxito:", response)
        return jsonify({"message": "Caso creado con éxito", "id": response['id']}), 200
    except Exception as e:
        logger.error("Error, no se pudo crear el caso:", str(e))
        # print("Error al crear el caso:", str(e))
        return jsonify({"error": str(e)}), 500

# Paypal -----------------------------------------------------------------------------------------------------------


@app.route('/payment', methods=['POST'])
def create_payment():
    logger.info("\n--- [POST] /Payment ---")
    # print("\n--- [POST] /payment ---")
    
    data = request.json
    donation_amount = data.get('donation_amount')
    email = data.get('email', '')
    
    
    # print(f"📩 Email recibido: {email}")
    logger.info(f"Email recibido: {email}")

    # print(f"💰 Monto de donación: {donation_amount}")
    logger.info(f"Monto de donación: {donation_amount}")

    if not donation_amount or float(donation_amount) <= 0:
        error_msg = "Monto inválido"
        # print(f"Error: {error_msg}")
        logger.error(f"Error: {error_msg}")
        return jsonify({"error": error_msg}), 400

    if not validate_email(email):
        error_msg = "Email inválido o no proporcionado"
        logger.error(f"Error: {error_msg}")
        # print(f"Error: {error_msg}")
        return jsonify({"error": error_msg, "code": "INVALID_EMAIL"}), 400

    try:
        # Asegurarnos de que el email esté codificado correctamente para la URL
        encoded_email = quote(email)
        return_url = f"http://localhost:3000/execute-payment?email={encoded_email}"
        # print(f"🔗 URL de retorno construida: {return_url}")
        logger.info(f"URL de retorno construida: {return_url}")
        

        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {"payment_method": "paypal"},
            "redirect_urls": {
                "return_url": return_url,
                "cancel_url": "http://localhost:3000/cancel-payment"
            },
            "transactions": [{
                "amount": {
                    "total": str(donation_amount),
                    "currency": "USD"
                },
                "description": f"Donación de {email}"
            }]
        })

        if payment.create():
            approval_url = next(link.href for link in payment.links if link.rel == "approval_url")
            response_data = {
                'paymentID': payment.id,
                'approval_url': approval_url,
                'salesforce_connection': sf_connection_status
            }
            # print(f"✅ Pago creado exitosamente: {payment.id}")
            logger.info(f"✅ Pago creado exitosamente: {payment.id}")

            # print(f"🔗 Approval URL: {approval_url}")
            logger.info(f"🔗 Approval URL: {approval_url}")
            return jsonify(response_data)
        
        # print(f"❌ [PAYPAL] Error al crear pago: {payment.error}")
        logger.error(f"[PAYPAL] Error al crear pago: {payment.error}")
        return jsonify({'error': payment.error}), 400

    except Exception as e:
        # print(f"❌ [EXCEPCIÓN] Error en /payment: {str(e)}")
        logger.error(f"[EXCEPCIÓN] Error en /payment: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/execute-payment', methods=['POST'])
def execute_payment():
    data = request.json
    payment_id = data.get('paymentID')
    payer_id = data.get('PayerID')
    email = data.get('email', '')

    # print("\n--- [POST] /execute-payment ---")
    logger.info("\n--- [POST] /execute-payment ---")

    # print(f"🔍 Datos recibidos - PaymentID: {payment_id}, PayerID: {payer_id}")
    logger.info(f"🔍 Datos recibidos - PaymentID: {payment_id}, PayerID: {payer_id}")

    # print(f"📩 Email recibido: {email}")
    logger.info(f"📩 Email recibido: {email}")

    if not payment_id or not payer_id:
        error_msg = 'Faltan parámetros requeridos (paymentID y PayerID)'
       # print(f"❌ Error: {error_msg}")
        logger.error(f"❌ Error: {error_msg}")
        
        return jsonify({'error': error_msg}), 400

    if not validate_email(email):
        error_msg = 'Se requiere un email válido para enviar la confirmación'
        # print(f"❌ Error: {error_msg}")
        logger.error(f"❌ Error: {error_msg}")
        return jsonify({'error': error_msg, 'code': 'INVALID_EMAIL'}), 400

    try:
        payment = paypalrestsdk.Payment.find(payment_id)
        print(f"🔍 Buscando pago en PayPal: {payment_id}")
        logger.info(f"Buscando pago en PayPal: {payment_id}")

        if payment.execute({'payer_id': payer_id}):
            donation_amount = payment.transactions[0].amount.total
            transaction_date = datetime.now().strftime('%Y-%m-%dT%H:%M:%S')

            response_data = {
                'success': True,
                'message': '¡Gracias por tu donación!',
                'amount': donation_amount,
                'email': email,
                'salesforce': {
                    'connection': sf_connection_status,
                    'record_created': False,
                    'record_id': None,
                    'error': None
                },
                'email_sent': False
            }

            # print(f"✅ Pago ejecutado exitosamente: ${donation_amount}")
            logger.info(f"✅ Pago ejecutado exitosamente: ${donation_amount}")

            # Enviar correo de confirmación
            try:
                msg = Message(
                    "Confirmación de donación",
                    sender=app.config['MAIL_USERNAME'],
                    recipients=[email]
                )
                msg.body = f"""Hola,\n\nGracias por tu donación de ${donation_amount}.\n\nDetalles de la transacción:
- ID: {payment_id}
- Fecha: {transaction_date}
- Monto: ${donation_amount}\n\nSaludos,\nEl equipo de donaciones"""
                mail.send(msg)
                response_data['email_sent'] = True
                # print(f"✉️ Correo enviado a: {email}")
                logger.info(f"Correo enviado a: {email}")

            except Exception as e:
                error_msg = str(e)
                response_data['email_error'] = error_msg
                # print(f"❌ Error al enviar correo: {error_msg}")
                logger.error(f"❌ Error al enviar correo: {error_msg}")

            # Crear registro en Salesforce
            if sf_connection_status['connected']:
                try:
                    # print("🔄 Intentando crear registro en Salesforce...")
                    logger.info("Creando registro en Salesforce...")

                    response = sf.FinanceTransaction.create({
                        'TransactionDate': transaction_date,
                        'ChargeAmount': donation_amount,
                        'ReferenceEntityType': 'Payment',  # Valor del picklist
                        'ResultingBalance': donation_amount,  # Campo obligatorio
                        'TotalAmountWithTax': donation_amount,
                        'EffectiveDate': transaction_date,
                        'OwnerId': "00GgK000000vn5d",
                        'email_usuario__c' : email
                    })
                    
                    if response.get('success'):
                        record_id = response.get('id')
                        response_data['salesforce'].update({
                            'record_created': True,
                            'record_id': record_id
                        })
                        print(f"✅ Registro creado en Salesforce. ID: {record_id}")
                        logger.info(f"Registro creado en Salesforce. ID: {record_id}")

                    else:
                        error_msg = str(response.get('errors', 'Error desconocido al crear registro'))
                        response_data['salesforce']['error'] = error_msg
                        # print(f"❌ Error en Salesforce: {error_msg}")
                        logger.error(f"Error en Salesforce: {error_msg}")

                except Exception as sf_error:
                    error_msg = str(sf_error)
                    response_data['salesforce']['error'] = error_msg
                    # print(f"❌ Excepción en Salesforce: {error_msg}")
                    logger.error(f"Excepción en Salesforce: {error_msg}")

            print(f"📊 Response final: {response_data}")
            return jsonify(response_data)
        
        # print(f"❌ [PAYPAL] Error al ejecutar pago: {payment.error}")
        logger.error(f"[PAYPAL] Error al ejecutar pago: {payment.error}")
        return jsonify({'error': payment.error}), 400

    except Exception as e:
        error_msg = str(e)
        # print(f"❌ [EXCEPCIÓN] Error en /execute-payment: {error_msg}")
        logger.error(f"[EXCEPCIÓN] Error en /execute-payment: {error_msg}")
        return jsonify({'error': error_msg}), 500

@app.route('/cancel-payment', methods=['GET'])
def cancel_payment():
    # print("\n--- [GET] /cancel-payment ---")
    logger.info("\n--- [POST] /cancel-payment ---")

    # print("⚠️ Pago cancelado por el usuario")
    logger.info("Pago cancelado por el usuario")
    return jsonify({'message': 'Pago cancelado por el usuario'}), 200

# Puntuacion -----------------------------------------------------------------------------------------------------------

# Ruta para recibir la puntuación
@app.route('/valoracion', methods=['POST'])
def recibir_valoracion():
    data = request.get_json()

    logger.info("\n--- [POST] /valoracion ---")

    logger.info(f"Valoración recibida: {data}")

    puntuacion = data.get("puntuacion")
    nombre = data.get("nombre", "Valoración Anónima")  # Si no se proporciona un nombre, usamos uno por defecto

    if not puntuacion or not isinstance(puntuacion, int):
        logger.warning("Puntuación inválida")
        return jsonify({"error": "Puntuación inválida"}), 400

    try:
        # Crear el registro en Salesforce, asegurando que se incluya el campo obligatorio 'Name'
        respuesta = sf.Puntuaciones__c.create({
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
    
# Sponsors -----------------------------------------------------------------------------------------------------------


@app.route('/sponsors', methods=['POST'])
def create_sponsor():
    logger.info("\n--- [POST] /registro ---")

    data = request.json
    
    logger.info(f"📩 Datos recibidos: {data}")
    
    name = data.get("name")
    email = data.get("email")
    url = data.get("url")
    razones = data.get("razones")
    

    if not email or not url or not name or not razones :
        error_msg = "Correo, url, nombre y descripción del por qué son campos obligatorios"
        logger.error(f"Validación fallida: {error_msg}")
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
            logger.info("Creando contacto en Salesforce...")

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
                logger.info(f"Contacto creado en Salesforce. ID: {record_id}")
            else:
                error_msg = str(response.get('errors', 'Error desconocido'))
                response_data['salesforce']['error'] = error_msg
                logger.error(f"Error al crear contacto: {error_msg}")

        except Exception as sf_error:
            error_msg = str(sf_error)
            response_data['salesforce']['error'] = error_msg
            logger.error(f"Excepción Salesforce: {error_msg}")

    else:
        response_data['salesforce']['error'] = "No conectado a Salesforce"
        logger.error("No conectado a Salesforce")

    logger.info(f"📊 Response final: {response_data}")
    return jsonify(response_data)

# main -----------------------------------------------------------------------------------------------------------

if __name__ == '__main__':
    logger.info("-- Iniciando servidor Flask en modo desarrollo -------------------------------")
    app.run(debug=True)