import React, { useEffect, useState } from 'react';
import axios from 'axios';
import aw from './img/aw.jpeg';
import './App.css';
import Paypal from './Paypal';  // Importamos el componente de Paypal

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')  // URL del backend en Flask
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los datos:', error);
      });
  }, []);

  return (
    <div>
      <header>
        <div className="aw">
          <img src={aw} alt="awaq" width={120} height={50}/>
        </div>
      </header>

      {data ? <h1>{data.message}</h1> : <p>Cargando...</p>}

      <div className="hola">
        Hola a todos
      </div>

      <iframe 
        src="https://ecoguardians2-0.github.io/EcoGuardians-2-0/" 
        width="100%" 
        height="600" 
        style={{ border: "none" }}  
        allowFullScreen 
        title="EcoGuardians Website"
      >
      </iframe>

      {/* Aquí se muestra el formulario de donación de PayPal después del iframe */}
      <Paypal />
    </div>
  );
}

export default App;
