import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate de react-router-dom
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import { Smile } from "lucide-react"; // implementación de lucide-react para el icono de la carita feliz
import LogoHeader from "../componentes/LogoHeader.png";

const Encabezado = ({ onHome }) => {
  const [idioma, setIdioma] = useState("ES");
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const navigate = useNavigate();

  const handleVolverClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const seleccionarIdioma = (lang) => {
    setIdioma(lang);
    setMostrarDropdown(false);
  };

  return (
    <header className="w-full bg-[#2B5629] py-3 px-3 flex justify-between items-center relative ">
      {/* Izquierda: Volver */}
      {onHome && (
        <a
          href="https://somosawaq.org"
          className="text-white font-bold text-xs no-underline z-10"
        >
          &lt; Volver a la página de AWAQ
        </a>
      )}
      {!onHome && (
        <button
          onClick={handleVolverClick}
          className="bg-[#2B5629] text-white border-2 border-white px-3.5 py-2 text-base rounded-xl hover:font-bold transition flex items-center justify-center w-[80px]"
          aria-label="Volver a la página de inicio"
        >
          Volver
        </button>
      )}
      {/* Centro: Logo */}
      {onHome && (
        <div className="absolute left-1/2 transform -translate-x-1/2 z-0">
          <img src={LogoHeader} alt="Logo AWAQ" className="h-12" />
        </div>
      )}

      {!onHome && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 z-0"
          onClick={(event) => {
            event.preventDefault();
            navigate("/"); // Redirige a la página de inicio
          }}
        >
          <img src={LogoHeader} alt="Logo AWAQ" className="h-12" />
        </div>
      )}
      {/* Derecha: FAQs e Idioma */}
      <div className="flex items-center gap-4 z-10">
        {/* Botón Cases */}
        <Link
          to="/CrearCaso"
          className="bg-[#2B5629] text-white border-2 border-white px-3.5 py-2 rounded-xl flex items-center justify-center hover:font-bold hover:text-white/80 transition"
          aria-label="Crear caso"
        >
          <Smile className="w-5 h-5" />
        </Link>

        {/* Botón FAQs */}
        <Link
          to="/faqs" // Redirige a la ruta /faqs
          className="bg-[#2B5629] text-white border-2 border-white px-3.5 py-2 text-base rounded-xl hover:font-bold transition"
          aria-label="Preguntas frecuentes"
        >
          FAQs
        </Link>

        {/* Dropdown idioma */}
        <div className="relative">
          <button
            onClick={() => setMostrarDropdown(!mostrarDropdown)}
            className="bg-[#2B5629] text-white border-2 border-white px-3.5 py-2 text-base rounded-xl flex items-center hover:font-bold transition"
            aria-haspopup="menu"
            aria-expanded={mostrarDropdown}
            aria-label="Seleccionar idioma"
          >
            {idioma}
            <span className="text-sm ml-1">˅</span>
          </button>

          {mostrarDropdown && (
            <div className="absolute right-0 mt-2 w-[65px] bg-[#2B5629] text-white rounded-xl shadow-lg z-20 border border-white">
              <button
                onClick={() => seleccionarIdioma("ES")}
                className="block w-full text-left px-3.5 py-2 hover:font-bold hover:text-gray-500 rounded-t-xl transition"
              >
                ES
              </button>
              <button
                onClick={() => seleccionarIdioma("EN")}
                className="block w-full text-left px-3.5 py-2 hover:font-bold hover:text-gray-500 rounded-b-xl transition"
              >
                EN
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Encabezado;
