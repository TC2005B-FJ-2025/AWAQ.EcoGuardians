from flask import Flask, request, jsonify
from flask_cors import CORS 
from simple_salesforce import Salesforce
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


# Configura CORS para permitir solicitudes desde http://localhost:3000
CORS(app, origins=["http://localhost:3000"])

sf = Salesforce(**config['salesforce'])  # Desempaqueta automáticamente las credenciales



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
        print("Caso creado con éxito:", response)
        return jsonify({"message": "Caso creado con éxito", "id": response['id']}), 200
    except Exception as e:
        print("Error al crear el caso:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)