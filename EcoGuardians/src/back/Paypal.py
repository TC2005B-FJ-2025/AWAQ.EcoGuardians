from flask import Flask, jsonify, request
import paypalrestsdk
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Permitir CORS desde React

# Configurar PayPal
paypalrestsdk.configure({
    "mode": "sandbox",  # Cambiar a "live" en producción
    "client_id": "AbnxxsUd9iRkjhAV5ZBZXYaR1wndy-SRb1GYpAO0v8sxltgXr8b95LcXlTXkap0dtW00dsjKHN99tSvn",
    "client_secret": "EHBHSkyg_wN403HCgo2KQH3NmMOyUXZtweda05n_CIsPgMyOkuq9bkZ_O1m4rQsFSVi1lP3X5KLLYo2r"
})

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hola ola LAO!'}
    return jsonify(data)

@app.route('/payment', methods=['POST'])
def payment():
    donation_amount = request.json.get('donation_amount')

    if not donation_amount or float(donation_amount) <= 0:
        return jsonify({"error": "Monto inválido"}), 400

    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/execute",
            "cancel_url": "http://localhost:5000/cancel"
        },
        "transactions": [{
            "amount": {
                "total": str(donation_amount),
                "currency": "USD"
            },
            "description": "Donación a la causa"
        }]
    })

    if payment.create():
        approval_url = next(link.href for link in payment.links if link.rel == "approval_url")
        return jsonify({'paymentID': payment.id, 'approval_url': approval_url})
    else:
        return jsonify({'error': payment.error}), 400

@app.route('/execute', methods=['GET'])
def execute():
    payment_id = request.args.get('paymentID')
    payer_id = request.args.get('PayerID')

    if not payment_id or not payer_id:
        return jsonify({'error': 'Faltan parámetros'}), 400

    payment = paypalrestsdk.Payment.find(payment_id)

    if payment.execute({'payer_id': payer_id}):
        return jsonify({'success': True, 'message': '¡Gracias por tu donación!'})
    else:
        return jsonify({'success': False, 'error': payment.error}), 400

@app.route('/cancel', methods=['GET'])
def cancel():
    return jsonify({'message': 'Pago cancelado'}), 200

if __name__ == '__main__':
    app.run(debug=True)
