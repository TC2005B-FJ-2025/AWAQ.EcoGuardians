from flask import Flask, jsonify, request
import paypalrestsdk
from flask_cors import CORS
from simple_salesforce import Salesforce
from datetime import datetime
from flask_mail import Mail, Message
import re
from urllib.parse import quote
import json 
import os

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


# Configuración general
CORS(app, origins=["http://localhost:3000"]) 
app.config['SECRET_KEY'] = config['flask_secret_key']

# Configuración de email
app.config.update(
    MAIL_SERVER=config['email']['mail_server'],
    MAIL_PORT=config['email']['mail_port'],
    MAIL_USE_TLS=True,
    MAIL_USERNAME=config['email']['mail_username'],
    MAIL_PASSWORD=config['email']['mail_password']
)
mail = Mail(app)

# Configuración PayPal
paypalrestsdk.configure(config['paypal'])  # Usa todo el bloque PayPal del JSON

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

def validate_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

@app.route('/api/data', methods=['GET'])
def get_data():
    response_data = {
        'message': 'Hola desde el backend!',
        'salesforce_connection': sf_connection_status
    }
    print("\n--- [GET] /api/data ---")
    print(f"Response: {response_data}")
    return jsonify(response_data)

@app.route('/payment', methods=['POST'])
def create_payment():
    data = request.json
    donation_amount = data.get('donation_amount')
    email = data.get('email', '')
    
    print("\n--- [POST] /payment ---")
    print(f"📩 Email recibido: {email}")
    print(f"💰 Monto de donación: {donation_amount}")

    if not donation_amount or float(donation_amount) <= 0:
        error_msg = "Monto inválido"
        print(f"❌ Error: {error_msg}")
        return jsonify({"error": error_msg}), 400

    if not validate_email(email):
        error_msg = "Email inválido o no proporcionado"
        print(f"❌ Error: {error_msg}")
        return jsonify({"error": error_msg, "code": "INVALID_EMAIL"}), 400

    try:
        # Asegurarnos de que el email esté codificado correctamente para la URL
        encoded_email = quote(email)
        return_url = f"http://localhost:3000/execute-payment?email={encoded_email}"
        print(f"🔗 URL de retorno construida: {return_url}")

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
            print(f"✅ Pago creado exitosamente: {payment.id}")
            print(f"🔗 Approval URL: {approval_url}")
            return jsonify(response_data)
        
        print(f"❌ [PAYPAL] Error al crear pago: {payment.error}")
        return jsonify({'error': payment.error}), 400

    except Exception as e:
        print(f"❌ [EXCEPCIÓN] Error en /payment: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/execute-payment', methods=['POST'])
def execute_payment():
    data = request.json
    payment_id = data.get('paymentID')
    payer_id = data.get('PayerID')
    email = data.get('email', '')

    print("\n--- [POST] /execute-payment ---")
    print(f"🔍 Datos recibidos - PaymentID: {payment_id}, PayerID: {payer_id}")
    print(f"📩 Email recibido: {email}")

    if not payment_id or not payer_id:
        error_msg = 'Faltan parámetros requeridos (paymentID y PayerID)'
        print(f"❌ Error: {error_msg}")
        return jsonify({'error': error_msg}), 400

    if not validate_email(email):
        error_msg = 'Se requiere un email válido para enviar la confirmación'
        print(f"❌ Error: {error_msg}")
        return jsonify({'error': error_msg, 'code': 'INVALID_EMAIL'}), 400

    try:
        payment = paypalrestsdk.Payment.find(payment_id)
        print(f"🔍 Buscando pago en PayPal: {payment_id}")

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

            print(f"✅ Pago ejecutado exitosamente: ${donation_amount}")

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
                print(f"✉️ Correo enviado a: {email}")
            except Exception as e:
                error_msg = str(e)
                response_data['email_error'] = error_msg
                print(f"❌ Error al enviar correo: {error_msg}")

            # Crear registro en Salesforce
            if sf_connection_status['connected']:
                try:
                    print("🔄 Intentando crear registro en Salesforce...")
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
                    else:
                        error_msg = str(response.get('errors', 'Error desconocido al crear registro'))
                        response_data['salesforce']['error'] = error_msg
                        print(f"❌ Error en Salesforce: {error_msg}")
                except Exception as sf_error:
                    error_msg = str(sf_error)
                    response_data['salesforce']['error'] = error_msg
                    print(f"❌ Excepción en Salesforce: {error_msg}")

            print(f"📊 Response final: {response_data}")
            return jsonify(response_data)
        
        print(f"❌ [PAYPAL] Error al ejecutar pago: {payment.error}")
        return jsonify({'error': payment.error}), 400

    except Exception as e:
        error_msg = str(e)
        print(f"❌ [EXCEPCIÓN] Error en /execute-payment: {error_msg}")
        return jsonify({'error': error_msg}), 500

@app.route('/cancel-payment', methods=['GET'])
def cancel_payment():
    print("\n--- [GET] /cancel-payment ---")
    print("⚠️ Pago cancelado por el usuario")
    return jsonify({'message': 'Pago cancelado por el usuario'}), 200

if __name__ == '__main__':
    print("\n🚀 Iniciando servidor Flask...")
    app.run(debug=True)