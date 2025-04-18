import React, { useState, useEffect } from "react";
import BannerNotificacion from "../componentes/BannerNotificaciones-bg.jpg";
import LogoAwaq from "../componentes/Imagen_logo_awaq.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Contacto from "../Formularios/Contacto";

const NotificationBanner = () => {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 1000);
  };

  const handleSubscribe = () => {
    setShowEmailInput(true);
  };


  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setShouldRender(false), 1000);
      }, 1500);
    }
  };

  // Si no debe renderizarse, retorna null
  if (!shouldRender) return null;

  if(showEmailInput && !submitted){
    return(
    <div
      className={`fixed top-0 bg-white right-1/2 translate-x-1/2 border border-gray-200 shadow-lg px-3 py-2 rounded-lg w-[450px] font-sans z-50 bg-cover bg-center transition-transform duration-1000 ease-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
    <Contacto onHandleClose={() => handleClose()}/>
    </div>
    )
}

  return (
    
    <div
      className={`fixed top-0 right-1/2 translate-x-1/2 border border-gray-200 shadow-lg px-3 py-2 rounded-lg w-[450px] font-sans z-50 bg-cover bg-center transition-transform duration-1000 ease-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      style={{ backgroundImage: `url(${BannerNotificacion})` }}
    >

      {!showEmailInput && !submitted && (
        <>
          <img
            src={LogoAwaq}
            alt="Logo AWAQ"
            className="w-[200px] mx-auto mb-2"
          />
          <p className="text-[16px] text-black mb-2 font-semibold text-center">
            Suscríbete a nuestras notificaciones para recibir las últimas
            actualizaciones y noticias relacionadas con AWAQ
          </p>
          <div className="flex justify-between">
            <button
              className="px-3 py-2 bg-white border-2 border-verde-claro text-gray-800 rounded-xl"
              onClick={handleClose}
            >
              No, Gracias
            </button>
            <button
              className="px-3 py-2 bg-verde-fuerte text-white rounded-xl"
              onClick={handleSubscribe}
            >
              Volverme Contacto
            </button>
          </div>
        </>
      )}
      
      {submitted && (
        <div className="flex flex-col items-center justify-center h-[192px]">
          <p className="text-2xl">¡Muchas Gracias!</p>
          <span className="text-7xl text-verde-fuerte animate-[scaleUp_0.5s_ease-in-out] mt-3">
            <FontAwesomeIcon icon={faCircleCheck} />
          </span>
        </div>
      )}
    </div>
  );
};

export default NotificationBanner;
