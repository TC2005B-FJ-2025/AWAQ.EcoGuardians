import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Encabezado from "./encabezado";
import { useNavigate } from "react-router-dom";
import NotificationBanner from "../overlays/NotificationBanner";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const VideojuegoInvitado = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [forzarModoMobile, setForzarModoMobile] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(false);
      setForzarModoMobile(true); // Activar encabezado móvil
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full min-h-screen bg-white flex flex-col overflow-auto relative pt-24"
    >
      <NotificationBanner className="relative z-100" />
      <div>
        <Encabezado forzarMobile={forzarModoMobile} />
      </div>

      {showButtons && (
        <div className="xl:absolute 2xl:top-28 2xl:right-4 sm:right-6 2xl:flex-col xl:gap-4 z-40 2xl:max-w-[90vw] hidden xl:flex">
          <button
            className="bg-white text-green-700 text-sm px-3 sm:px-4 py-1.5 rounded-full border-2 border-green-700 shadow-[2px_2px_0px_0px_rgba(47,85,47,1)] w-[180px]"
            onClick={() => navigate("../Prospecto")}
          >
            {t("videogameGuest.contact")}
          </button>

          <button
            className="bg-white text-green-700 text-sm px-3 sm:px-4 py-1.5 rounded-full border-2 border-green-700 shadow-[2px_2px_0px_0px_rgba(47,85,47,1)] w-[180px]"
            onClick={() => navigate("../Sponsors")}
          >
            {t("videogameGuest.registerSponsor")}
          </button>

          <button
            className="bg-white text-green-700 text-sm px-3 sm:px-4 py-1.5 rounded-full border-2 border-green-700 shadow-[2px_2px_0px_0px_rgba(47,85,47,1)] w-[180px] flex items-center justify-center"
            onClick={() => navigate("../Puntuacion")}
          >
            <FaStar className="text-xl" />
          </button>
        </div>
      )}

      <div className="flex-grow flex items-center justify-center px-4 pb-2 mt-2 overflow-hidden">
        {isPortrait ? (
          <div className="text-center text-black">
            <p className="text-xl font-semibold mb-4">
              {t("videogameGuest.rotateDevice")}
            </p>
          </div>
        ) : (
          <div className="w-full h-screen relative pr-0 sm:pr-[200px] ">
            <iframe
              src="https://ecoguardians2-0.github.io/EcoGuardians-2-0/"
              title="Ecoguardianes 2.0"
              allowFullScreen
              frameBorder="0"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: "none" }}
            ></iframe>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default VideojuegoInvitado;
