// Importación de las dependencias necesarias
import React from "react";
import { motion } from "framer-motion";

// Importación de componentes e imágenes
import Encabezado from "./encabezado.js";
import imagenBoton from "../componentes/interfaz_inicio.png";
import imagenIzquierda from "../componentes/logos_unity.png";
import imagenDerecha from "../componentes/logo_pontificia.png";
import { useNavigate } from "react-router-dom";
import SwipperImages from "./SwipperImages.js";
import { useTranslation } from "react-i18next";

// Componente principal 
const BienvenidaComoInvitado = () => {
    const { t } = useTranslation();

    const navigate = useNavigate(); // Hook para la navegación
    // Función para manejar el clic en el botón "JUGAR"
    const handleJugarClick = (event) => {
        event.preventDefault()
        navigate("/juego"); // Navega a la ruta "/juego"
    };
    return (
        <motion.section
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col w-full h-screen bg-white overflow-hidden"
        >
            <Encabezado onHome={false}/>

            {/* Botón "Registrarse" */}
            <div className="hidden  top-48 sm:top-36 right-4 sm:right-8 xl:flex xl:absolute flex-col gap-4 z-50 w-[200px] sm:w-[230px]">
                {/* Botón Contactanos */}
                <button
                    className="bg-white text-green-700 text-lg px-4 sm:px-6 py-2 rounded-full border-2 border-green-700 shadow-[2px_2px_0px_0px_rgba(47,85,47,1)] w-[230px]"
                    onClick={event => {
                    event.preventDefault();
                    navigate("../Prospecto");
                    }}
                    aria-label={t("bienvenida.contactanos")}
                >
                    {t("bienvenida.contactanos")}
                </button>

                {/* Botón Sponsor */}
                <button
                    className="bg-white text-green-700 text-lg px-4 sm:px-6 py-2 rounded-full border-2 border-green-700 shadow-[2px_2px_0px_0px_rgba(47,85,47,1)] w-[230px]"
                    onClick={event => {
                    event.preventDefault();
                    navigate("../Sponsors");
                    }}
                    aria-label={t("bienvenida.registro_sponsor")}
                >
                    {t("bienvenida.registro_sponsor")}
                </button>

                {/* Botón Registrate */}
                <button
                    className="bg-white text-green-700 text-lg px-4 sm:px-6 py-2 rounded-full border-2 border-green-700 shadow-[2px_2px_0px_0px_rgba(47,85,47,1)] w-[230px]"
                    onClick={event => {
                    event.preventDefault();
                    navigate("../Contacto");
                    }}
                    aria-label={t("bienvenida.registro_contacto")}
                > 
                   {t("bienvenida.registro_contacto")} 
                </button>
            </div>

            <div className="flex-grow relative">  
                {/* Fondo del juego */}
                <div className="absolute inset-0 w-full h-full object-cover">
                <SwipperImages />
                </div>
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
                            aria-label={t("bienvenida.jugar")}
                        >
                            <div className="flex items-center gap-2 justify-start w-full pl-6"> 
                                <div className="flex items-center justify-center w-8 h-8 border-2 border-green-700 rounded-full">
                                    <span className="text-green-700">▶</span> 
                                </div>
                                <span className="pl-3">{t("bienvenida.jugar")}</span>
                            </div>
                        </button>
                    </div>

                    {/* Logos institucionales */}
                    <div className="absolute bottom-4 md:w-full flex justify-between items-center px-4 sm:px-10 w-[100%] ">
                        <img 
                            src={imagenIzquierda} 
                            alt="Logo Unity" 
                            className="w-[100px] h-[30px] sm:w-[150px] sm:h-[45px] md:w-[220px] xl:h-[110px] "
                        />
                        <img 
                            src={imagenDerecha} 
                            alt="Logo Universidad" 
                            className="w-[80px] sm:w-[100px] md:w-[150px]"
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default BienvenidaComoInvitado;
