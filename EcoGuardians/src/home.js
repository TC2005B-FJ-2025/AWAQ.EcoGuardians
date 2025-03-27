import { Inicio, Nosotros } from "./InHome/inicio.js";  
import './index.css';
import Preloader from "./InHome/preloader.js";
import Encabezado from "./InHome/encabezado.js";
import BienvenidaComoInvitado from "./InHome/BienvenidaComoInvitado.js";
import Videojuego from "./InHome/Videojuego.js";
import { useState } from "react";
import Footer from "./InHome/footer.js";
import Sponsors from "./InHome/sponsors.js";  
import { AnimatePresence } from "framer-motion";
import {Login} from "./overlays/index.js";

const Home = () => {
  const [cargando, setCargando] = useState(true); 
  const [pantalla, setPantalla] = useState("inicio"); // valores: inicio, bienvenida, juego
  
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {cargando ? (
        <Preloader alFinalizar={() => setCargando(false)} />
      ) : (
        <AnimatePresence>
          {pantalla === "inicio" && (
            <>
              <Encabezado />
              <Inicio onBienvenidaComoInvitado={() => setPantalla("bienvenida")} onLogin = {() => setPantalla("login")} />
              <Nosotros />
              <Sponsors />
              <Footer />
            </>
          )}

          {pantalla === "bienvenida" && (
            <BienvenidaComoInvitado onJugar={() => setPantalla("juego")} />
          )}

          {pantalla === "juego" && <Videojuego />}

          {pantalla === "login" && <Login onJugar ={() => setPantalla("bienvenida")}/>}
        </AnimatePresence>

      )}
    </div>
  );
};

export default Home;