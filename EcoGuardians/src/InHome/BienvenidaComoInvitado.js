// Importación de las dependencias necesarias
import React from "react";
import { motion } from "framer-motion";

// Importación de componentes e imágenes
import Encabezado from "./encabezado.js";
import logo from "../componentes/Videojuego_fondo_frame.png";
import imagenBoton from "../componentes/interfaz_inicio.png";
import imagenIzquierda from "../componentes/logos_unity.png";
import imagenDerecha from "../componentes/logo_pontificia.png";
import { useNavigate } from "react-router-dom"; // Importa useNavigate desde react-router-dom


// Componente principal 
const BienvenidaComoInvitado = () => {

    const navigate = useNavigate(); // Hook para la navegación
    // Función para manejar el clic en el botón "JUGAR"
    const handleJugarClick = (event) => {
        event.preventDefault()
        navigate("/juegoInvitado"); // Navega a la ruta "/juego"
    };
    return (
        <motion.section
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col w-full h-screen bg-white overflow-hidden"
        >
            <Encabezado />

            {/* Botón "Registrarse" */}
            <button className="absolute top-16 right-4 sm:top-20 sm:right-8 bg-white text-green-700 text-lg px-4 sm:px-6 py-2 rounded-full border-2 border-green-700 shadow-[2px_2px_0px_0px_rgba(47,85,47,1)] z-50"
            onClick={event => {
                event.preventDefault();
                navigate("../registro")
            }}
            >
                Registrarse
            </button>

            <div className="flex-grow relative">  
                {/* Fondo del juego */}
                <img 
                    src={logo} 
                    alt="Pantalla del juego" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Contenido principal */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                    <div className="relative mt-10"> 
                        <img 
                            src={imagenBoton} 
                            alt="Interfaz Inicio" 
                            className="w-[280px] sm:w-[350px] md:w-[450px] -mt-10"
                        />

                        {/* Botón JUGAR */}
                        <button
                            onClick={handleJugarClick} // Maneja el clic en el botón
                            className="absolute top-[70%] left-1/2 transform -translate-x-1/2 bg-white text-green-700 text-lg w-[280px] sm:w-[350px] py-2 rounded-full border-2 border-green-700 shadow-[4px_3px_0px_0px_rgba(47,85,47,1)]"
                        >
                            <div className="flex items-center gap-2 justify-start w-full pl-6"> 
                                <div className="flex items-center justify-center w-8 h-8 border-2 border-green-700 rounded-full">
                                    <span className="text-green-700">▶</span> 
                                </div>
                                <span className="pl-3">Jugar</span>
                            </div>
                        </button>
                    </div>

                    {/* Logos institucionales */}
                    <div className="absolute bottom-4 w-full flex justify-between px-4 sm:px-10">
                        <img 
                            src={imagenIzquierda} 
                            alt="Logo Unity" 
                            className="w-[100px] h-[30px] sm:w-[150px] sm:h-[45px] md:w-[220px] md:h-[65px] translate-y-6 sm:translate-y-12 md:translate-y-16 lg:translate-y-20"
                        />
                        <img 
                            src={imagenDerecha} 
                            alt="Logo Universidad" 
                            className="w-[80px] sm:w-[100px] md:w-[150px] -mr-5 translate-y-0"
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default BienvenidaComoInvitado;
