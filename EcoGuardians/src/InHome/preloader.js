import React, { useEffect } from "react";
import logo from "../Componentes/imagen-cargando.png"; 

const Preloader = ({ alFinalizar }) => {
  useEffect(() => {
    const temporizador = setTimeout(() => {
      alFinalizar(); 
    }, 1500);

    return () => clearTimeout(temporizador); 
  }, [alFinalizar]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-white flex justify-center items-center z-[9999] transition-opacity duration-100">
      <img
        src={logo}
        alt="Cargando..."
        className="w-[800px] animate-fadeOut"
      />
      <style>
        {`
          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
          .animate-fadeOut {
            animation: fadeOut 2s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Preloader;
