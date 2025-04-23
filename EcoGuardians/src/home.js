import { Inicio, Nosotros } from "./InHome/inicio.js";  
import './index.css';
import Preloader from "./InHome/preloader.js";
import Encabezado from "./InHome/encabezado.js";
import { useEffect, useState } from "react";
import Footer from "./InHome/footer.js";
import Sponsors from "./InHome/sponsors.js";  
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Importa useNavigate desde react-router-dom
import SponsorInfoSection from "./InHome/seccionColabora.js";
import Donaciones from "./InHome/Donaciones.js";  

const Home = () => {
  const [cargando, setCargando] = useState(false); 
  const navigate = useNavigate();
  
  useEffect(() => {
    const yaVisito = sessionStorage.getItem("homeVisitado");

    if (!yaVisito) {
      setCargando(true);
      sessionStorage.setItem("homeVisitado", "true");
  
    }
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {cargando ? (
        <Preloader alFinalizar={() => setCargando(false)} />
      ) : (
        <AnimatePresence>
            <>
              <Encabezado onHome={true}/>
              <Inicio 
                onBienvenidaComoInvitado={() => navigate("/bienvenida")} 
                onProspecto={() => navigate("/prospecto")}
              />
              <Nosotros />
              <Donaciones />
              <Sponsors />
              <SponsorInfoSection 
                onContacto={() => navigate("/Contacto")}
                onSponsors={() => navigate("/Sponsors")}
              />
              <Footer onProspecto={() => navigate("/prospecto")} />

            </>

        </AnimatePresence>
      )}
    </div>
  );
};

export default Home;
