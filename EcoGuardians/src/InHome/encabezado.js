import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Smile } from "lucide-react";
import LogoHeader from "../componentes/LogoHeader.png";
import { useTranslation } from "react-i18next";

const Encabezado = ({ onHome }) => {
  const { t, i18n } = useTranslation();
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const navigate = useNavigate();

  const handleVolverClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    setMostrarDropdown(false);
  };

  return (
    <header className="w-full bg-[#2B5629] py-3 px-4 fixed top-0 z-50">
      {/* Vista para computadoras */}
      <div className="hidden xl:flex items-center justify-between">
        {/* Columna izquierda: Volver */}
        <div className="flex-1 flex justify-start">
          {onHome ? (
            <a
              href="https://somosawaq.org"
              className="text-white font-bold text-sm no-underline"
            >
              &lt; {t("header.back_AWAQ")}
            </a>
          ) : (
            <button
              onClick={handleVolverClick}
              className="bg-[#2B5629] text-white border-2 border-white px-3.5 py-2 text-sm rounded-xl hover:font-bold transition"
              aria-label="Volver a la página de inicio"
            >
              {t("header.back")}
            </button>
          )}
        </div>

        {/* Columna central: Logo */}
        <div className="flex-1 flex justify-center">
          <img
            src={LogoHeader}
            alt="Logo AWAQ"
            className="h-12 cursor-pointer"
          />
        </div>

        {/* Columna derecha: Botones */}
        <div className="flex-1 flex justify-end items-center gap-2 flex-wrap">
          {/* Quejas y sugerencias */}
          <Link
            to="/crearCaso"
            className="bg-[#2B5629] text-white border-2 border-white px-3 py-2 rounded-xl flex items-center justify-center hover:font-bold hover:text-white/80 transition"
            aria-label="Crear caso"
          >
            <Smile className="w-5 h-5" />
          </Link>

          {/* Faqs */}
          <Link
            to="/faqs"
            className="bg-[#2B5629] text-white border-2 border-white px-4 py-2 text-sm rounded-xl hover:font-bold transition"
          >
            {t("header.faqs")}
          </Link>

          {/* Idioma Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMostrarDropdown(!mostrarDropdown)}
              className="bg-[#2B5629] text-white border-2 border-white px-4 py-2 text-sm rounded-xl flex items-center hover:font-bold transition"
              aria-haspopup="menu"
              aria-expanded={mostrarDropdown}
              aria-label={t("header.select_language")}
            >
              {i18n.language.toUpperCase()}
              <span className="text-sm ml-1">˅</span>
            </button>

            {mostrarDropdown && (
              <div className="absolute right-0 mt-2 w-[65px] bg-[#2B5629] text-white rounded-xl shadow-lg z-50 border border-white">
                <button
                  onClick={() => toggleLanguage("es")}
                  className="block w-full text-left px-3.5 py-2 hover:font-bold hover:text-gray-400 rounded-t-xl transition"
                >
                  {t("header.es")}
                </button>
                <button
                  onClick={() => toggleLanguage("en")}
                  className="block w-full text-left px-3.5 py-2 hover:font-bold hover:text-gray-400 rounded-b-xl transition"
                >
                  {t("header.en")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vista para móviles y tablets */}
      <div className="flex xl:hidden items-center justify-between">
        {/* Menú desplegable */}
        <div className="relative">
          <button
            onClick={() => setMostrarMenu(!mostrarMenu)}
            className="text-white text-lg focus:outline-none"
            aria-label="Abrir menú"
          >
            ☰
          </button>
          {mostrarMenu && (
            <div className="absolute left-0 mt-2 w-48 bg-[#2B5629] text-white rounded-lg shadow-lg z-50 border border-white">
              <ul className="flex flex-col">
                {/* Botón de volver */}
                {onHome ? (
                  <li className="px-4 py-2 hover:bg-[#1E3E1E] rounded-lg transition">
                    <a
                      href="https://somosawaq.org"
                      className="text-white no-underline"
                    >
                      &lt; {t("header.back_AWAQ")}
                    </a>
                  </li>
                ) : (
                  <li className="px-4 py-2 hover:bg-[#1E3E1E] rounded-lg transition">
                    <button
                      onClick={handleVolverClick}
                      className="text-white w-full text-left"
                    >
                      &lt; {t("header.back")}
                    </button>
                  </li>
                )}

                {/* Quejas y sugerencias */}
                <li className="px-4 py-2 hover:bg-[#1E3E1E] rounded-lg transition">
                  <Link to="/crearCaso" className="text-white">
                    {t("header.quejas")}
                  </Link>
                </li>

                {/* Contáctanos */}
                <li className="px-4 py-2 hover:bg-[#1E3E1E] rounded-lg transition">
                  <Link to="/prospecto" className="text-white">
                    {t("bienvenida.contactanos")}
                  </Link>
                </li>

                {/* Regístrate como sponsor */}
                <li className="px-4 py-2 hover:bg-[#1E3E1E] rounded-lg transition">
                  <Link to="/sponsors" className="text-white">
                    {t("bienvenida.registro_sponsor")}
                  </Link>
                </li>

                {/* Regístrate como contacto */}
                <li className="px-4 py-2 hover:bg-[#1E3E1E] rounded-lg transition">
                  <Link to="/contacto" className="text-white">
                    {t("bienvenida.registro_contacto")}
                  </Link>
                </li>

                {/* Valoración */}
                <li className="px-4 py-2 hover:bg-[#1E3E1E] rounded-lg transition">
                  <Link to="/puntuacion" className="text-white">
                    {t("header.valoracion")}
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <img src={LogoHeader} alt="Logo AWAQ" className="h-12" />
        </div>

        {/* Botón de cambio de idioma */}
        <div className="relative">
          <button
            onClick={() => setMostrarDropdown(!mostrarDropdown)}
            className="bg-[#2B5629] text-white border-2 border-white px-4 py-2 text-sm rounded-xl flex items-center hover:font-bold transition"
            aria-haspopup="menu"
            aria-expanded={mostrarDropdown}
            aria-label={t("header.select_language")}
          >
            {i18n.language.toUpperCase()}
            <span className="text-sm ml-1">˅</span>
          </button>

          {mostrarDropdown && (
            <div className="absolute right-0 mt-2 w-[65px] bg-[#2B5629] text-white rounded-xl shadow-lg z-50 border border-white">
              <button
                onClick={() => toggleLanguage("es")}
                className="block w-full text-left px-3.5 py-2 hover:font-bold hover:text-gray-400 rounded-t-xl transition"
              >
                {t("header.es")}
              </button>
              <button
                onClick={() => toggleLanguage("en")}
                className="block w-full text-left px-3.5 py-2 hover:font-bold hover:text-gray-400 rounded-b-xl transition"
              >
                {t("header.en")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Encabezado;
