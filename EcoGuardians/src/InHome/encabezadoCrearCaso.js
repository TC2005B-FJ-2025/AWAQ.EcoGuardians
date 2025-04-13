import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import LogoHeader from "../componentes/LogoHeader.png";

const Encabezado = () => {
  const [idioma, setIdioma] = useState("ES");
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  const seleccionarIdioma = (lang) => {
    setIdioma(lang);
    setMostrarDropdown(false);
  };

  return (
    <header className="w-full bg-[#2B5629] py-3 px-3 flex justify-between items-center relative ">
      {/* Izquierda: Volver */}
      <a
        href="https://somosawaq.org"
        className="text-white font-bold text-xs no-underline z-10"
      >
        &lt; Volver a la página de AWAQ
      </a>

      {/* Centro: Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-0">
        <img src={LogoHeader} alt="Logo AWAQ" className="h-12" />
      </div>

      {/* Derecha: FAQs e Idioma */}
      <div className="flex items-center gap-4 z-10">

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
