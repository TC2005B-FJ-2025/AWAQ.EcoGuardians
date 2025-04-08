import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Encabezado from "./encabezado";
import fondo from "../componentes/Videojuego_fondo_frame.png";
import logoUnity from "../componentes/logos_unity.png";
import logoUniversidad from "../componentes/logo_pontificia.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faUpload, faGear } from "@fortawesome/free-solid-svg-icons";

const BienvenidaUsuarioRegistrado = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col w-full h-screen bg-white overflow-hidden"
    >
      {/* Encabezado */}
      <Encabezado />

      {/* Fondo */}
      <div className="flex-grow relative">
        <img
          src={fondo}
          alt="Fondo"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        {/* Contenido */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl sm:text-5xl font-bold text-center">Ecoguardianes 2.0</h1>
          <h2 className="text-xl sm:text-2xl mt-2 mb-6">Bienvenido Usuario6537</h2>

          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <button 
              onClick={() => navigate("/juego")}
              className="w-full bg-white text-green-800 py-3 px-4 rounded-full border-2 border-green-700 text-lg flex items-center justify-center gap-2 shadow"
            >
              <FontAwesomeIcon icon={faPlusCircle} className="w-5 h-5" />
              Nueva partida
            </button>

            <button className="w-full bg-white text-green-800 py-3 px-4 rounded-full border-2 border-green-700 text-lg flex items-center justify-center gap-2 shadow">
              <FontAwesomeIcon icon={faUpload} className="w-5 h-5" />
              Cargar partida anterior
            </button>

            <button className="w-full bg-white text-green-800 py-3 px-4 rounded-full border-2 border-green-700 text-lg flex items-center justify-center gap-2 shadow">
              <FontAwesomeIcon icon={faGear} className="w-5 h-5" />
              Ajustes
            </button>
          </div>

          {/* Logos inferiores */}
          <div className="absolute bottom-4 w-full flex justify-between px-4 sm:px-10">
            <img
              src={logoUnity}
              alt="Logo Unity"
              className="w-[100px] h-[30px] sm:w-[150px] sm:h-[45px] md:w-[220px] md:h-[65px] translate-y-6 sm:translate-y-12 md:translate-y-16 lg:translate-y-20"
            />
            <img
              src={logoUniversidad}
              alt="Logo Universidad"
              className="w-[80px] sm:w-[100px] md:w-[150px] -mr-5 translate-y-0"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default BienvenidaUsuarioRegistrado;
