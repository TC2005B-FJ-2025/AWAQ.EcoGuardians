from flask import Flask, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuración de conexión MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'awaq2'

mysql = MySQL(app)

# ------------------------------------------------------------------------------------

@app.route('/BarsChart')
def get_users_by_country_region():
    cur = mysql.connection.cursor()

    # Ejecutar query
    cur.execute("""
        SELECT country, region, COUNT(*) AS total_usuarios
        FROM UsersData
        GROUP BY country, region;
    """)

    results = cur.fetchall()
    cur.close()

    # Organizar datos para el gráfico
    countries = {}
    for row in results:
        country = row[0]
        region = row[1]
        total_usuarios = row[2]

        if country not in countries:
            countries[country] = {}
        countries[country][region] = total_usuarios

    # Preparar la data para el gráfico
    labels = list(countries.keys())  # Países
    regions = set(region for _, region, _ in results)  # Regiones
    dataset = {region: [] for region in regions}

    for country in countries:
        for region in regions:
            dataset[region].append(countries[country].get(region, 0))

    data = {
        "labels": labels,
        "regions": list(regions),
        "dataset": dataset
    }

    return jsonify(data)

# ------------------------------------------------------------------------------------

@app.route('/UserRegis')
def get_user_registrations_by_month():
    cur = mysql.connection.cursor()

    # Ejecutar el query
    cur.execute("""
        SELECT MONTH(creationDate) AS mes, COUNT(*) AS total_registros
        FROM UsersData
        GROUP BY mes;
    """)

    results = cur.fetchall()
    cur.close()

    # Organizar los datos para el gráfico
    meses = [result[0] for result in results]
    total_registros = [result[1] for result in results]

    data = {
        "meses": meses,
        "total_registros": total_registros
    }

    return jsonify(data)


# ------------------------------------------------------------------------------------

@app.route('/totDonation')
def get_total_donations_by_month():
    cur = mysql.connection.cursor()

    # Ejecutar el query
    cur.execute("""
        SELECT MONTH(creationDate) AS mes, SUM(donation) AS total_donaciones
        FROM UsersData
        GROUP BY mes;
    """)

    results = cur.fetchall()
    cur.close()

    # Organizar los datos para el gráfico
    meses = [result[0] for result in results]
    total_donaciones = [result[1] for result in results]

    data = {
        "meses": meses,
        "total_donaciones": total_donaciones
    }

    return jsonify(data)

# ------------------------------------------------------------------------------------

@app.route('/game-completion')
def get_game_completion():
    cur = mysql.connection.cursor()

    # 📌 Ejecutar query
    cur.execute("""
        SELECT
            COUNT(*) AS total_sesiones,
            SUM(CASE WHEN completedGame = TRUE THEN 1 ELSE 0 END) AS juegos_completados
        FROM Sessions;
    """)

    result = cur.fetchone()
    cur.close()

    total_sesiones = result[0] if result[0] is not None else 0
    juegos_completados = result[1] if result[1] is not None else 0

    data = {
        "labels": ["Juegos Completados", "No Completados"],
        "values": [juegos_completados, total_sesiones - juegos_completados]
    }


    return jsonify(data)

# ------------------------------------------------------------------------------------

@app.route('/BarAge')
def get_users_by_age_group():
    cur = mysql.connection.cursor()

    # Ejecutar el query
    cur.execute("""
        SELECT
            CASE
                WHEN minAge BETWEEN 0 AND 11 THEN 'Niños'
                WHEN minAge BETWEEN 12 AND 17 THEN 'Adolescentes'
                WHEN minAge BETWEEN 18 AND 34 THEN 'Jóvenes Adultos'
                WHEN minAge BETWEEN 35 AND 54 THEN 'Adultos Medios'
                ELSE 'Adultos Mayores'
            END AS grupo_edad,
            COUNT(*) AS total
        FROM UsersData
        GROUP BY grupo_edad;
    """)

    results = cur.fetchall()
    cur.close()

    # Organizar los datos para el gráfico
    grupos_edad = [result[0] for result in results]
    total_usuarios = [result[1] for result in results]

    data = {
        "grupos_edad": grupos_edad,
        "total_usuarios": total_usuarios
    }

    return jsonify(data)


# ------------------------------------------------------------------------------------

@app.route('/AverageRating')
def get_average_rating():
    cur = mysql.connection.cursor()

    # Ejecutar el query
    cur.execute("""
        SELECT ROUND(AVG(rating) / 2, 1) AS rating_escalado
        FROM UsersData
        WHERE rating IS NOT NULL;
    """)

    result = cur.fetchone()
    cur.close()

    # Devolvemos la satisfacción promedio
    return jsonify({"average_rating": result[0]})


# ------------------------------------------------------------------------------------



# ------------------------------------------------------------------------------------



# ------------------------------------------------------------------------------------

if __name__ == '__main__':
    app.run(debug=True)
