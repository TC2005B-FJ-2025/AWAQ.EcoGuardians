from flask import Flask, request, jsonify
from flask_cors import CORS 
from simple_salesforce import Salesforce

app = Flask(__name__)

# Configura CORS para permitir solicitudes desde http://localhost:3000
CORS(app, origins=["http://localhost:3000"])

# Configuración de Salesforce (usando variables de entorno)
sf = Salesforce(
    username='c3170600750@agentforce.com',
    password='salesforcin2',
    security_token='G0dXIw88ZtgYjiHNllRZ9gpHF',
    consumer_key='3MVG9rZjd7MXFdLhTtQ3o7490SYfft0KQKGUGhfDAdo9IH8TvkFVU7ZbP51y9n42LRAPsKJXiHkAtvEuwZ.rK',
    consumer_secret='DB514D96E146B86A35C94684D7632DB0F3D659741F42AC04C9437DEA1E9D1AB7'
)

@app.route('/crear-caso', methods=['POST'])
def crear_caso():
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
            'Subject': subject,
            'Description': description,
            'Priority': priority,
            'Status': 'New',  # Estado inicial del caso
            'nombre_usuario__c': nombre_usuario,  # Campo personalizado
            'SuppliedEmail': supplied_email,  # Campo corregido
            'Tipo_Opinion__c': tipo_opinion,  # Campo personalizado
            'Opiniones_Sugerencias__c': opiniones_sugerencias,  # Campo personalizado
        })
        print("Caso creado con éxito:", response)
        return jsonify({"message": "Caso creado con éxito", "id": response['id']}), 200
    except Exception as e:
        print("Error al crear el caso:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)