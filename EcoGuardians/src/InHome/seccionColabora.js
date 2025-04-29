import React from "react";
import { useTranslation } from "react-i18next";
import AnimacionFadeUp from "../InHome/AnimacionFadeUp";

const SponsorInfoSection = ({ onContacto, onSponsors }) => {
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

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 divide-x divide-gray-600">


        {/* <div className="flex flex-col items-center text-center px-6 py-8"> */}
        <AnimacionFadeUp> 
          <div className="flex flex-col items-center text-center px-6 py-8">
            <div className="flex items-center w-full mb-2">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 text-gray-700 text-lg font-semibold">
                {t("sponsorSection.titleColabora")}
              </span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
            <h2 className="text-[48px] font-title text-[#5F874E] font-bold mb-4">
              {t("sponsorSection.sponsorHeading")}
            </h2>
            <p className="text-sm text-gray-700 mb-1">
            {processTextWithLineBreaks(t("sponsorSection.sponsorText1"))}
            </p>
            <p className="text-sm text-gray-700 mb-4">
            {processTextWithLineBreaks(t("sponsorSection.sponsorText2"))}
            </p>
            <button
              onClick={onSponsors}
              className="bg-[#5F874E] text-white text-sm px-5 py-2 rounded-full hover:bg-green-800 transition"
            >
              {t("sponsorSection.sponsorButton")}
            </button>
          </div>
        </AnimacionFadeUp>


        {/* <div className="flex flex-col items-center text-center px-6 py-8"> */}
        <AnimacionFadeUp> 
          <div className="flex flex-col items-center text-center px-6 py-8">
            <div className="flex items-center w-full mb-2">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 text-gray-700 text-lg font-semibold">
                {t("sponsorSection.titleInformate")}
              </span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
            <h2 className="text-[48px] font-title text-[#5F874E] font-bold mb-4">
              {t("sponsorSection.contactHeading")}
            </h2>
            <p className="text-sm text-gray-700 mb-1">
              {t("sponsorSection.contactText1")}
            </p>
            <p className="text-sm text-gray-700 mb-4">
            {processTextWithLineBreaks(t("sponsorSection.contactText2"))}
            </p>
            <button
              onClick={onContacto}
              className="bg-[#5F874E] text-white text-sm px-5 py-2 rounded-full hover:bg-green-800 transition"
            >
              {t("sponsorSection.contactButton")}
            </button>
          </div>
        </AnimacionFadeUp>

      </div>
    </div>
  );
};

export default SponsorInfoSection;
