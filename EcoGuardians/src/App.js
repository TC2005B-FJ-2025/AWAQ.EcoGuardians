import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";


import BienvenidaUsuarioRegistrado from "./InHome/BienvenidaUsuarioRegistrado";
import VideojuegoRegistrado from "./InHome/VideojuegoRegistrado";
import BienvenidaComoInvitado from "./InHome/BienvenidaComoInvitado.js";
import VideojuegoInvitado from "./InHome/VideojuegoInvitado.js";
import PreguntasFrecuentes from "./FAQs/PreguntasFrecuentes.js"
import Contacto from "./Formularios/Contacto.js"
import Sponsors from "./Formularios/Sponsors.js"
import Prospecto from "./Formularios/Prospecto.js"
import CrearCaso from "./Formularios/CrearCaso.js"; 


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/bienvenida" element={<BienvenidaUsuarioRegistrado />} /> 
        <Route path="/bienvenidaInvitado" element={<BienvenidaComoInvitado />} />
        <Route path="/juego" element={<VideojuegoRegistrado />} />
        <Route path="/juegoInvitado" element={<VideojuegoInvitado/>} />
        <Route path="/faqs" element={<PreguntasFrecuentes />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/Sponsors" element={<Sponsors />} />
        <Route path="/Prospecto" element={<Prospecto />} />
        <Route path="/CrearCaso" element={<CrearCaso />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;