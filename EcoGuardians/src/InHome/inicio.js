import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import awaq from "../componentes/Imagen_logo_awaq.png";
import universidad from "../componentes/Imagen_logo_universidad.png";
import logo from "../componentes/Videojuego_fondo_frame.png";

const Inicio = ({ onBienvenidaComoInvitado }) => {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-screen w-full">
      <h1 className="text-2xl font-normal pb-1">AWAQ presenta</h1>
      <h2 className="text-7xl text-verde-claro font-bold pt-1 mb-10">
        Ecoguardianes 2.0
      </h2>
      <div className="flex justify-center mb-5">
        <img
          src={logo}
          alt="Imagen del juego Ecoguardians"
          className="w-[656px] h-[253px] rounded-[18px] object-cover"
        />
      </div>
      <div className="flex gap-4 mt-5">
        <button
          onClick={onBienvenidaComoInvitado}
          className="bg-white text-black text-lg px-5 py-2 rounded-full border-black border-2 hover:bg-verde-fuerte hover:border-transparent hover:text-white transition"
        >
          Jugar como invitado
        </button>

        {/* Este Link navega a la ruta /login */}
        <Link
          to="/login"
          className="bg-verde-claro text-white text-lg px-5 py-2 rounded-full hover:bg-verde-fuerte transition flex items-center justify-center"
        >
          Iniciar sesión
        </Link>
      </div>
    </section>
  );
};


const Nosotros = () => {
  const [mostrarTexto, setMostrarTexto] = useState(false);

  return (
    <section className="flex flex-col items-center text-center p-10">
      <h2 className="text-5xl font-bold text-verde-claro mb-5">
        Sobre Nosotros
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl w-full">
        <div className="flex items-center gap-5">
          <img src={awaq} alt="Logo AWAQ" className="w-48" />
          <img src={universidad} alt="Logo Universidad" className="w-48" />
        </div>
        <div className="max-w-md text-left">
          <p className="mb-2">
            EcoGuardians 2.0 es un juego educativo diseñado para promover la
            conciencia ambiental.
          </p>
          <h3 className="text-[27px] font-semibold pb-1 ">Sobre nosotros</h3>
          <p>
            AWAQ ONGD es una organización global comprometida con empoderar y
            conservar a las comunidades en su misión de proteger y restaurar la
            biodiversidad. Usando tecnologías emergentes para que las personas y
            comunidades de todo el mundo protejan y restauren su biodiversidad.
            {mostrarTexto && (
              <>
                Desde 2019, AWAQ ha trabajado en proyectos que promueven la
                conservación de ecosistemas y el impacto positivo en comunidades
                locales. Uno de sus principales enfoques es la Estación
                Biológica del Norte de Caldas (EBNC), un espacio clave para la
                investigación, el ecoturismo y la concientización ambiental.
              </>
            )}
          </p>
          <button
            className="text-verde-claro font-bold mt-2 hover:underline"
            onClick={() => setMostrarTexto(!mostrarTexto)}
          >
            {mostrarTexto ? "Mostrar menos..." : "Saber más..."}
          </button>
        </div>
      </div>
    </section>
  );
};

export { Inicio, Nosotros };
