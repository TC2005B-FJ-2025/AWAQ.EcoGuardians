import React, { useState } from "react";
import awaq from "../componentes/Imagen_logo_awaq.png";
import universidad from "../componentes/Imagen_logo_universidad.png";
import SwipperImages from "./SwipperImages";
import { useTranslation } from "react-i18next"; 
import AnimacionFadeUp from "./AnimacionFadeUp";

const Inicio = ({ onBienvenidaComoInvitado, onProspecto }) => {
  const { t } = useTranslation(); 

  return (
    <section className="flex flex-col items-center justify-center text-center min-h-screen w-full pt-[100px] sm:pt-[100px]">
      <AnimacionFadeUp> 
      <h1 className="text-2xl font-normal pb-1">{t("inicio.presenta")}</h1>
      <h2 className="text-4xl sm:text-6xl lg:text-7xl text-verde-claro font-bold pt-1 mb-10">
      {t("inicio.titulo")}
      </h2>
      </AnimacionFadeUp>

      <AnimacionFadeUp>
      <div className="mb-5 w-full max-w-[656px] h-auto lg:h-[260px] rounded-[18px] p-0 overflow-hidden">
        <SwipperImages />
      </div>
      </AnimacionFadeUp>

      <AnimacionFadeUp>
      <div className="flex flex-col sm:flex-row gap-4 mt-5 items-center justify-center">
        {/* Botón Contáctanos */}
        <button
          onClick={onProspecto} // Por ahora no hace nada
          className="bg-white text-black text-lg px-5 py-2 rounded-full border-black border-2 hover:bg-verde-fuerte hover:border-transparent hover:text-white transition mb-4 sm:mb-0"
        >
          {t("inicio.contactanos")}
        </button>

        <button
          onClick={onBienvenidaComoInvitado}
          className="bg-verde-claro text-white text-lg px-5 py-2 rounded-full hover:bg-verde-fuerte transition"
          aria-label="Jugar como invitado"
        >
          {t("inicio.jugar")}
        </button>
      </div>
      </AnimacionFadeUp>
    </section>
  );
};

const Nosotros = () => {
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const { t } = useTranslation(); 

  return (
    <AnimacionFadeUp>
    <section className="flex flex-col items-center text-center p-5 sm:p-10">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-verde-claro mb-5 text-justify">
      {t("inicio.sobre_nosotros")}
      </h2>
      <div className="flex lg:flex-row flex-col items-center justify-center gap-6 max-w-4xl w-full">
        <div className="flex items-center gap-5">
          <img src={awaq} alt="Logo AWAQ" className="w-32 sm:w-48" />
          <img src={universidad} alt="Logo Universidad" className="w-32 sm:w-48" />
        </div>
        <div className="max-w-md text-justify">
          <p className="mb-2">
          {t("inicio.descripcion_breve")}
          </p>
          <h3 className="text-[22px] sm:text-[27px] font-semibold pb-1">
          {t("inicio.titulo_seccion")}
          </h3>
          <p>
          {t("inicio.descripcion_larga")}
            {mostrarTexto && (
              <>
               {t("inicio.descripcion_expandida")}
              </>
            )}
          </p>
          <button
            className="text-verde-claro font-bold mt-2 hover:underline"
            onClick={() => setMostrarTexto(!mostrarTexto)}
          >
            {mostrarTexto ? t("inicio.mostrar_menos") : t("inicio.saber_mas")}
          </button>
        </div>
      </div>
    </section>
    </AnimacionFadeUp>
  );
};

export { Inicio, Nosotros };
