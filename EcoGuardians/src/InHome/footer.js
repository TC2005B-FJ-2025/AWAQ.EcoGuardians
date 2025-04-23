import SponsorCarousel from "./Carrousel.js";
import logoAwaq from "../componentes/Imagen_logo_awaq.png";
import imgTecSocioformador from "../componentes/Socios Formadores.png";
import imgProjectGalileo from "../componentes/project galileo-7a8a11be.png";
import imgUptimerobot from "../componentes/uptimerobot-logo-98d24b91.png";
import { useTranslation } from "react-i18next";
import AnimacionFadeUp from "../InHome/AnimacionFadeUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = ({onProspecto }) => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#F3F3F3] pt-6">
      <div className="w-[90%] max-w-[1200px] mx-auto pb-8">

        {/* Sección general */}
        {/* <div className="flex flex-col md:flex-row justify-between gap-10 mb-10"> */}
        <AnimacionFadeUp> 
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">

            {/* Contacto */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 md:w-1/3">
            <button
              onClick={onProspecto}
              className="font-bold text-lg bg-transparent border-none cursor-pointer hover:underline"
            >
              {t("footer.contacto")}
            </button>

              <p>{t("footer.direccion")}</p>
              <a
                href="mailto:info@somosawaq.org"
                className="text-blue-600 hover:underline"
              >
                info@somosawaq.org
              </a>
            </div>

            {/* Logo y redes */}
            <div className="flex flex-col items-center gap-4 md:w-1/3">
              <img
                src={logoAwaq}
                alt="Logo Awaq"
                className="max-w-[160px] w-full"
              />
              <div className="flex justify-center gap-6 text-2xl">
                <a
                  href="https://www.facebook.com/somosawaq"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} className="hover:text-verde-fuerte" />
                </a>
                <a
                  href="https://www.instagram.com/awaqongd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} className="hover:text-verde-fuerte" />
                </a>
                <a
                  href="https://www.linkedin.com/company/awaq-ongd/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="hover:text-verde-fuerte" />
                </a>
              </div>
            </div>

            {/* Información legal */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 md:w-1/3">
              <h4 className="font-bold text-lg">{t("footer.legal")}</h4>
              <a
                href="https://www.somosawaq.org/politica-de-privacidad"
                className="hover:underline"
              >
                {t("footer.privacidad")}
              </a>
              <a
                href="https://www.somosawaq.org/politica-de-cookies"
                className="hover:underline"
              >
                {t("footer.cookies")}
              </a>
              <a
                href="https://www.somosawaq.org/aviso-legal"
                className="hover:underline"
              >
                {t("footer.aviso")}
              </a>
            </div>
          </div>
        </AnimacionFadeUp>

        {/* Colaboradores */}
        <AnimacionFadeUp> 
          <div className="flex flex-col items-center mt-8">
            <h4 className="font-bold text-lg mb-4">{t("footer.colaboradores")}</h4>
            <SponsorCarousel />
          </div>
        </AnimacionFadeUp>

        {/* Méritos */}
        <AnimacionFadeUp> 
          <div className="mt-10">
            <h4 className="text-center font-bold text-lg mb-6">{t("footer.meritos")}</h4>
            <div className="flex flex-col sm:flex-row justify-around items-center gap-8">
              <div className="flex flex-col items-center gap-2 text-center max-w-[180px]">
                <img src={imgTecSocioformador} alt="Socios Formadores" className="w-10 h-16 object-contain" />
                <span className="text-xs">{t("footer.tec")}</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center max-w-[180px]">
                <img src={imgProjectGalileo} alt="Project Galileo" className="h-16 object-contain" />
                <span className="text-xs">{t("footer.galileo")}</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center max-w-[180px]">
                <img src={imgUptimerobot} alt="Uptimerobot" className="h-16 object-contain" />
                <span className="text-xs">{t("footer.uptimerobot")}</span>
              </div>
            </div>
          </div>
        </AnimacionFadeUp>

        {/* Copyright */}
        <div className="text-center text-xs mt-10">
          © 2025 Awaq EcoGuardians
        </div>
      </div>
    </footer>
  );
};

export default Footer;