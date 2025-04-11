import "../home.css";
import SponsorCarousel from "./Carrousel.js";
import logoAwaq from "../componentes/Imagen_logo_awaq.png";
import imgTecSocioformador from "../componentes/Socios Formadores.png";
import imgProjectGalileo from "../componentes/project galileo-7a8a11be.png";
import imgUptimerobot from "../componentes/uptimerobot-logo-98d24b91.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
const footer = function () {
  return (
    <div className="w-full bg-[#F3F3F3] pt-6">
      <div className="w-[80%] mx-auto pb-4">
        <div
          className="w-250 mx-auto sm:flex sm:w-[100%] h-[180px]"
          id="div-informacion-general"
        >
          <div
            className="w-[30%] flex flex-col justify-start pl-2 h-fit pt-6 gap-1 items-center"
            id="div-contacto"
          >
            <span className="font-bold">Contacto</span>
            <span>Carrera 110 N 69 B-59, Bogota DC (Colombia)</span>
            <span>
              <a href="mailto:info@somosawaq.org">info@somosawaq.org</a>
            </span>
          </div>
          <div
            className="w-[40%] flex flex-col items-center justify-center gap-4"
            id="div-logo-redes"
          >
            <img
              src={logoAwaq}
              alt="logo de Awaq"
              className="max-w-[200px] w-[100%]"
            />
            <div
              className="w-full max-w-[200px] flex justify-between"
              id="logos-socials"
            >
              <a
                href="https://www.facebook.com/somosawaq"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} size="2x" className="hover:text-verde-fuerte"/>
              </a>
              <a
                href="https://www.instagram.com/awaqongd/?igshid=MTk0NTkyODZkYg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" className="hover:text-verde-fuerte" />
              </a>
              <a
                href="https://www.linkedin.com/company/awaq-ongd/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" className="hover:text-verde-fuerte "/>
              </a>
            </div>
          </div>
          <div
            className="w-[30%] flex flex-col justify-start items-center gap-1 pr-4 pt-6" 
            id="div-informacion-legal"
          >
            <span className="font-bold">Informacion Legal</span>
            <span>
              <a href="https://www.somosawaq.org/politica-de-privacidad">
                Políticas de Privacidad
              </a>
            </span>
            <span>
              <a href="https://www.somosawaq.org/politica-de-cookies">
                Políticas de Cookies
              </a>
            </span>
            <span>
              <a href="https://www.somosawaq.org/aviso-legal">Aviso Legal</a>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center mt-4" id="div-colaboradores">
          <span className="w-fit font-bold" id="span-colaboradores">
            Nuestros Colaboradores
          </span>
          <SponsorCarousel />
        </div>
        <div className="mt-4 w-1/2 mx-auto" id="div-meritos">
          <h3 className="font-bold w-fit mx-auto mb-10 mt-5">Méritos</h3>
          <div className="flex mt-4" id="logos-organizaciones-meritos">
            <div className="w-1/3 flex flex-col items-center gap-3 justify-start">
              <img
                className="w-[40px] h-16 object-contain"
                src={imgTecSocioformador}
                alt="logo Socioformadores Tec"
              />
              <span className="text-center text-[10px]">
                Socios Formadores del Tecnológico de Monterrey
              </span>
            </div>
            <div className="w-1/3 flex flex-col items-center gap-3 justify-start">
              <img
                className="h-16 object-contain"
                src={imgProjectGalileo}
                alt="logo Project Galileo"
              />
              <span className="text-[10px]">Powered by Project Galileo</span>
            </div>
            <div className="w-1/3 flex flex-col items-center gap-3 justify-start">
              <img
                className="h-16 object-contain"
                src={imgUptimerobot}
                alt="logo Uptimerobot"
              />
              <span className="text-[10px]">Supported by Uptimerobot</span>
            </div>
          </div>
        </div>
        <div className="w-fit mx-auto mt-4 text-xs">
          <span>Copyright @ 2025 Awaq EcoGuardians</span>
        </div>
      </div>
    </div> 
  );
};

export default footer;
