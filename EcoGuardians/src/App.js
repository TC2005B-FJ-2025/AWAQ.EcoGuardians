import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";


import BienvenidaUsuarioRegistrado from "./InHome/BienvenidaUsuarioRegistrado";
import VideojuegoRegistrado from "./InHome/VideojuegoRegistrado";
import BienvenidaComoInvitado from "./InHome/BienvenidaComoInvitado.js";
import VideojuegoInvitado from "./InHome/VideojuegoInvitado.js";
import PreguntasFrecuentes from "./FAQs/PreguntasFrecuentes.js"

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
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;