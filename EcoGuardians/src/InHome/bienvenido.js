import React from "react";
import { motion } from "framer-motion";

const Bienvenido = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center h-screen bg-white text-center"
        >
            <h1 className="text-4xl font-bold text-green-700">EcoGuardianes 2.0</h1>
            <p className="mt-2 text-lg text-gray-700">Bienvenido Usuario6537</p>

            {/* Botones de opciones */}
            <div className="mt-6 space-y-4 w-[280px] sm:w-[350px]">
                <button className="bg-white text-green-700 w-full py-3 rounded-full border-2 border-green-700 flex items-center gap-3 justify-center">
                    <span className="text-2xl">➕</span> Nueva partida
                </button>

                <button className="bg-white text-green-700 w-full py-3 rounded-full border-2 border-green-700 flex items-center gap-3 justify-center">
                    <span className="text-2xl">⏎</span> Cargar partida anterior
                </button>

                <button className="bg-white text-green-700 w-full py-3 rounded-full border-2 border-green-700 flex items-center gap-3 justify-center">
                    <span className="text-2xl">⚙️</span> Ajustes
                </button>
            </div>
        </motion.div>
    );
};

export default Bienvenido;
