import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./overlays/Login";
import Registro from "./overlays/Registro.js";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
