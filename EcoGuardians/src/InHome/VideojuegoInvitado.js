import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Encabezado from "./encabezado";
import { useNavigate } from "react-router-dom";


const VideojuegoInvitado = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth < 768;
      const isVertical = window.innerHeight > window.innerWidth;
      setIsPortrait(isMobile && isVertical);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  return (
    <motion.section
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-screen bg-white flex flex-col overflow-hidden relative"
    >
      {/* Encabezado fijo */}
      <div className="sticky top-0 z-50">
        <Encabezado />
      </div>

      {/* Botón "Registrarse" arriba a la derecha */}
      <button className="absolute top-20 right-4 sm:top-20 sm:right-8 bg-white text-green-700 text-lg px-4 sm:px-6 py-2 rounded-full border-2 border-green-700 shadow-[2px_2px_0px_0px_rgba(47,85,47,1)] z-40" 
      onClick={event => {
        event.preventDefault();
        navigate("../registro")
    }}>
        Registrarse
      </button>

      {/* Contenido */}
      <div className="flex-grow flex items-center justify-center px-4 pb-4 overflow-hidden">
        {isPortrait ? (
          <div className="text-center text-black">
            <p className="text-xl font-semibold mb-4">
              📲 Por favor, gira tu dispositivo para jugar en modo horizontal.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-6xl max-h-[calc(100vh-6rem)] aspect-video overflow-hidden rounded-xl shadow-lg">
            <iframe
              src="https://ecoguardians2-0.github.io/EcoGuardians-2-0/"
              title="Ecoguardianes 2.0"
              allowFullScreen
              frameBorder="0"
              className="w-full h-full"
              style={{ border: "none" }}
            ></iframe>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default VideojuegoInvitado;
