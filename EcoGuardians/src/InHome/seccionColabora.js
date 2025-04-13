import React from "react";

const SponsorInfoSection = ({onContacto, onSponsors}) => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 divide-x divide-gray-600">
        
        {/* Colabora */}
        <div className="flex flex-col items-center text-center px-6 py-8">
        <div className="flex items-center w-full mb-2">
        <div className="flex-grow border-t border-gray-600"></div>
        <span className="mx-4 text-gray-700 text-lg font-semibold">Colabora</span>
        <div className="flex-grow border-t border-gray-600"></div>
        </div>
          <h2 className="text-[48px] font-title text-[#5F874E] font-bold mb-4">Hazte Sponsor</h2>
          <p className="text-sm text-gray-700 mb-1">
            ¿Te gustaría apoyarnos? ¡Regístrate como sponsor!
          </p>
          <p className="text-sm text-gray-700 mb-4">Al volverte sponsor...</p>
          <button 
            onClick={onSponsors}
            className="bg-[#5F874E]  text-white text-sm px-5 py-2 rounded-full hover:bg-green-800 transition">
            Regístrate como Sponsor
          </button>
        </div>

        {/* Infórmate */}
        <div className="flex flex-col items-center text-center px-6 py-8">
        <div className="flex items-center w-full mb-2">
        <div className="flex-grow border-t border-gray-600"></div>
        <span className="mx-4 text-gray-700 text-lg font-semibold">Infórmate</span>
        <div className="flex-grow border-t border-gray-600"></div>
        </div>
          <h2 className="text-[48px] font-title text-[#5F874E] font-bold mb-4">Conoce más</h2>
          <p className="text-sm text-gray-700 mb-1">
            ¿Te gusta lo que ves? ¡Vuélvete contacto!
          </p>
          <p className="text-sm text-gray-700 mb-4">
            Al volverte contacto recibirás todas las noticias...
          </p>
          <button
            onClick={onContacto}
            className="bg-[#5F874E] 0 text-white text-sm px-5 py-2 rounded-full hover:bg-green-800 transition"
           >
            Regístrate como Contacto
          </button>
        </div>
      </div>
    </div>
  );
};

export default SponsorInfoSection;

