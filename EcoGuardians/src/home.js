import { Inicio, Nosotros } from "./InHome/inicio.js";  
import './index.css';
import Preloader from "./InHome/preloader.js";
import Encabezado from "./InHome/encabezado.js";
import { useState } from "react";
import Footer from "./InHome/footer.js";
import Sponsors from "./InHome/sponsors.js";  
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Importa useNavigate desde react-router-dom
import SponsorInfoSection from "./InHome/seccionColabora.js";
import NotificationBanner from "./overlays/NotificationBanner.js";
import Contacto from "./Formularios/Contacto.js";

const Home = () => {
  const [cargando, setCargando] = useState(true); 
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {cargando ? (
        <Preloader alFinalizar={() => setCargando(false)} />
      ) : (
        <AnimatePresence>
            <>
              <Encabezado />
              <NotificationBanner />
              <Inicio />
              <Nosotros />
              <Sponsors />
              <SponsorInfoSection />
              <Footer />

              <Contacto />

            </>

        </AnimatePresence>
      )}
    </div>
  );
};

export default Home;
