import { Inicio, Nosotros } from "./inicio.js";  
import './index.css';
import Preloader from "./preloader.js";
import Encabezado from "./encabezado.js";
import { useState } from "react";
import Footer from "./footer.js";
import Sponsors from "./sponsors.js";  

const App = () => {
  const [cargando, setCargando] = useState(true); 
  
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {cargando ? (
        <Preloader alFinalizar={() => setCargando(false)} />
      ) : (
        <>
          <Encabezado />
          <Inicio />
          <Nosotros />
          <Sponsors />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;