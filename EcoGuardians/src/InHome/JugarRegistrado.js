// src/InHome/JugarComoInvitado.jsx
import React from "react";
import { motion } from "framer-motion";
import Encabezado from "./encabezado.js";

// Imágenes
import logo from "../componentes/Videojuego_fondo_frame.png";
import imagenBoton from "../componentes/interfaz_inicio.png";
import imagenIzquierda from "../componentes/logos_unity.png";
import imagenDerecha from "../componentes/logo_pontificia.png";

const JugarComoInvitado = ({ username = "UsuarioInvitado", onNuevaPartida, onCargarPartida }) => {
    return (
        <motion.section
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col w-full h-screen bg-white overflow-hidden"
        >
            <Encabezado />

            <div className="flex-grow relative">
                {/* Fondo */}
                <img 
                    src={logo} 
                    alt="Pantalla del juego" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Contenido */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">¡Bienvenido {username}!</h1>
                    <p className="text-base sm:text-lg mb-6">Elige una opción para comenzar</p>

                    {/* Imagen decorativa y botones */}
                    <div className="relative mt-2">
                        <img 
                            src={imagenBoton} 
                            alt="Interfaz Inicio" 
                            className="w-[280px] sm:w-[350px] md:w-[450px]"
                        />

                        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 w-[280px] sm:w-[350px] space-y-3">
                            <button onClick={onNuevaPartida} className="bg-white text-green-700 text-lg py-2 w-full rounded-full border-2 border-green-700 shadow-[4px_3px_0px_0px_rgba(47,85,47,1)]">
                                Nueva partida
                            </button>
                            <button onClick={onCargarPartida} className="bg-white text-green-700 text-lg py-2 w-full rounded-full border-2 border-green-700 shadow-[4px_3px_0px_0px_rgba(47,85,47,1)]">
                                Cargar partida anterior
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logos */}
            <div className="absolute bottom-4 w-full flex justify-between px-4 sm:px-10 z-20">
                <img src={imagenIzquierda} alt="Logo Unity" className="w-[100px] sm:w-[150px]" />
                <img src={imagenDerecha} alt="Logo Universidad" className="w-[80px] sm:w-[100px]" />
            </div>
        </motion.section>
    );
};

export default JugarComoInvitado;
