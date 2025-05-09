import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; 
import AnimacionFadeUp from "../InHome/AnimacionFadeUp"; 

const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState([]);
  const { t } = useTranslation(); 
  // Función para procesar el texto con saltos de línea
  const processTextWithLineBreaks = (text) => {
    return text.split("\n").map((line, index) => {
      const parts = line.split(/(\*\*.*?\*\*)/g); // Divide por texto entre ** **
  
      return (
        <span key={index}>
          {parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={i}>{part.slice(2, -2)}</strong>; // Aplica negritas
            }
            return <span key={i}>{part}</span>;
          })}
          <br />
        </span>
      );
    });
  };
  
  useEffect(() => {
    fetch("/sponsors.json")
      .then((res) => res.json())
      .then((data) => setSponsors(data))
      .catch((error) => console.error(t("sponsors.error_sponsor"), error));
  }, [t]);

  if (!sponsors || sponsors.length === 0) return null;
  return (

    // <div className="text-center py-12 bg-gray-100 px-20">
    <AnimacionFadeUp> 
      <div className="text-center py-12 bg-gray-100 px-20">
        <h2 className="text-5xl font-bold text-verde-claro mb-3">{t("sponsors.titulo")}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
        {processTextWithLineBreaks(t("sponsors.descripcion"))}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4" id="id">
          {sponsors.map((sponsor) => (
            // <div key={sponsor.id} className="bg-gray-100 p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:-translate-y-1">
            <AnimacionFadeUp key={sponsor.id}>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:-translate-y-1">
                <div className="w-full h-36 rounded-lg overflow-hidden flex items-center justify-center bg-white">
                  <img src={sponsor.image} alt={sponsor.name} className="object-contain h-full" />
                </div>
                <h3 className="text-xl font-semibold mt-4">{sponsor.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{sponsor.description}</p>
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-verde-fuerte font-bold hover:underline"
                >
                  {t("sponsors.saber_mas")}
                </a>
              </div>
            </AnimacionFadeUp>
          ))}
        </div>
      </div>
    </AnimacionFadeUp>
  );
};

export default SponsorsSection;
