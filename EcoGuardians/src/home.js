import { Inicio, Nosotros } from "./InHome/inicio.js";  
import './index.css';
import Preloader from "./InHome/preloader.js";
import Encabezado from "./InHome/encabezado.js";
import BienvenidaComoInvitado from "./InHome/BienvenidaComoInvitado.js";
import BienvenidaUsuarioRegistrado from "./InHome/BienvenidaUsuarioRegistrado.js";
import VideojuegoInvitado from "./InHome/VideojuegoInvitado.js";
import VideojuegoRegistrado from "./InHome/VideojuegoRegistrado.js";
import { useState } from "react";
import Footer from "./InHome/footer.js";
import Sponsors from "./InHome/sponsors.js";  
import { AnimatePresence } from "framer-motion";
import { Login } from "./overlays/index.js";
import { Routes, Route } from 'react-router-dom';
import Registro from "./overlays/Registro.js"; 

<Routes>
  <Route path="/registro" element={<Registro />} />
</Routes>


const Home = () => {
  const [cargando, setCargando] = useState(true); 
  const [pantalla, setPantalla] = useState("inicio"); 

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {cargando ? (
        <Preloader alFinalizar={() => setCargando(false)} />
      ) : (
        <AnimatePresence>
          {pantalla === "inicio" && (
            <>
              <Encabezado />
              <Inicio 
                onBienvenidaComoInvitado={() => setPantalla("bienvenidaInvitado")} 
                onLogin={() => setPantalla("login")} 
              />
              <Nosotros />
              <Sponsors />
              <Footer />
            </>
          )}

{pantalla === "bienvenidaInvitado" && (
  <BienvenidaComoInvitado onJugar={() => setPantalla("juegoI")} />
)}

{pantalla === "bienvenidaUsuario" && (
  <BienvenidaUsuarioRegistrado onJugar={() => setPantalla("juegoR")} />
)}


          {pantalla === "juegoI" && <VideojuegoInvitado />}
          {pantalla === "juegoR" && <VideojuegoRegistrado />}

          {pantalla === "login" && (
            <Login onJugar={() => setPantalla("bienvenidaUsuario")} />
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Home;
