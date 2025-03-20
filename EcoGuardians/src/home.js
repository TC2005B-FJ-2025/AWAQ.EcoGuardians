import { Inicio, Nosotros } from "./InHome/inicio.js";  
import './index.css';
import Preloader from "./InHome/preloader.js";
import Encabezado from "./InHome/encabezado.js";
import { useState } from "react";
import Footer from "./InHome/footer.js";
import Sponsors from "./InHome/sponsors.js";  

const Home = () => {
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

export default Home;