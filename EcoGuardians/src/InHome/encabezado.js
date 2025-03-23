import React, { useState } from "react";

const Encabezado = () => {
    const [idioma, setIdioma] = useState("ES");

    const cambiarIdioma = () => {
        setIdioma((prevIdioma) => (prevIdioma === "ES" ? "EN" : "ES"));
    };

    return (
        <header className="w-full bg-white py-4 px-8 flex justify-between items-center">
            <a href="https://somosawaq.org" className="text-verde-fuerte font-bold text-sm no-underline">
                &lt; Volver a la página de AWAQ
            </a>
            
            <div className="flex items-center gap-5">
                <button 
                    className="bg-white text-verde-fuerte border-2 border-verde-fuerte px-5 py-2 text-lg font-bold rounded-full transition-colors duration-300 hover:bg-green-800 hover:text-white"
                    onClick={cambiarIdioma}
                >
                    {idioma}
                </button>
            </div>
        </header>
    );
};

export default Encabezado;