// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./overlays/Login";
import Registro from "./overlays/Registro.js";
import ForgotPassword from "./overlays/ForgotPassword";
import RestablecerContraseñaCodigo from "./overlays/RestablecerContraseñaCodigo";
import RestablecerContraseñaCambio from "./overlays/RestablecerContraseñaCambio";
import RestablecerContraseñaFinal from "./overlays/RestablecerContraseñaFinal";

import BienvenidaUsuarioRegistrado from "./InHome/BienvenidaUsuarioRegistrado";
import VideojuegoRegistrado from "./InHome/VideojuegoRegistrado";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/bienvenida" element={<BienvenidaUsuarioRegistrado />} /> 
        <Route path="/juego" element={<VideojuegoRegistrado />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/restablecer-codigo" element={<RestablecerContraseñaCodigo />} />
        <Route path="/restablecer-cambio" element={<RestablecerContraseñaCambio />} />
        <Route path="/restablecer-final" element={<RestablecerContraseñaFinal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
