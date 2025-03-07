import React from 'react';
import aw from './img/aw.jpeg';
import './App.css';
import Paypal from './Paypal';
import SalesforceForm from './salesforce';
import JuegoAwa from './juego';

function App() {

  return (
    <div>
      <header>
        <div className="aw">
          <img src={aw} alt="awaq" width={120} height={50}/>
        </div>
      </header>

      <JuegoAwa />
      

      {/* Aquí se muestra el formulario de donación de PayPal después del iframe */}
      <Paypal />

      <SalesforceForm />
    </div>
  );
}

export default App;
