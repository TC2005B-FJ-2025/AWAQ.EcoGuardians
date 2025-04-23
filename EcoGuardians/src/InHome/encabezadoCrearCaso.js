import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LogoHeader from "../componentes/LogoHeader.png";
import { useTranslation } from "react-i18next";

const EncabezadoCrearCaso = ({ onHome }) => {
  const { t, i18n } = useTranslation(); 
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const navigate = useNavigate();

  const seleccionarIdioma = (lang) => {
    i18n.changeLanguage(lang); //  Cambia el idioma global
    localStorage.setItem("i18nextLng", lang);
    setMostrarDropdown(false);
  };

  return (
    <header className="w-full bg-[#2B5629] py-3 px-4 flex items-center justify-between fixed top-0 z-50">
      {/* Columna izquierda: Volver */}
      <div className="flex-1 flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="text-white font-bold text-sm no-underline"
          aria-label={t("faqHeader.back")}
        >
          {t("faqHeader.back")}
        </button>
      </div>

      {/* Columna central: Logo */}
      <div className="flex-1 flex justify-center">
        <img
          src={LogoHeader}
          alt="Logo AWAQ"
          className="h-12"
        />
      </div>

      {/* Columna derecha: FAQs + idioma */}
      <div className="flex-1 flex justify-end items-center gap-2 flex-wrap">
        {/* FAQs */}
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
            <div className="absolute right-0 mt-2 w-[65px] bg-[#2B5629] text-white rounded-xl shadow-lg z-20 border border-white">
              <button
                onClick={() => seleccionarIdioma("es")}
                className="block w-full text-left px-3.5 py-2 hover:font-bold hover:text-gray-400 rounded-t-xl transition"
              >
                {t("faqHeader.es")}
              </button>
              <button
                onClick={() => seleccionarIdioma("en")}
                className="block w-full text-left px-3.5 py-2 hover:font-bold hover:text-gray-400 rounded-b-xl transition"
              >
                {t("faqHeader.en")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default EncabezadoCrearCaso;
