import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import tecLogo from '../componentes/tec_logo1.png';
import gitlogo from "../componentes/Github.png";
import microsoftLogo from "../componentes/micro.png";
import universidadEanLogo from "../componentes/universidad-ean-logo.png";
import salesForceLogo from "../componentes/salesforce-Logo.png";
import SenaLogo from "../componentes/SENA-Logo.png";
import checLogo from "../componentes/chec-logo.png";


const SponsorCarousel = () => {
  const sponsors = [
    [tecLogo,"https://tec.mx/es?srsltid=AfmBOoqUWgQY0hiPtSdNkA_PCOr_RfzzMdUQfjvTRgk6Z5DTqyHx5x5Y"],
    [gitlogo,"https://github.com/"],
    [microsoftLogo,"https://www.microsoft.com"],
    [universidadEanLogo,"https://universidadean.edu.co/"],
    [salesForceLogo,"https://www.salesforce.com"],
    [SenaLogo,"https://www.sena.edu.co/es-co/Paginas/default.aspx"],
    [checLogo, "https://www.chec.com.co/" ],
  ];

  return (
    <div className="flex items-center mt-[20px] w-full max-w-[1200px] m-auto">
      <Swiper
        modules={[Autoplay]}
        className="w-full max-w-[900px] mt-[20px]"
        spaceBetween={2}
        slidesPerView={window.innerWidth < 768 ? 1 : 5}
        autoplay={{ delay: 3000 }}
        loop
      >
        {sponsors.map(([sponsorICon, sponsorUrl], index) => (          
          <SwiperSlide key={index} className="flex justify-center items-center w-fit">
            <a href={sponsorUrl} target="_blank" rel="noreferrer">
              <img src={sponsorICon} alt={`Sponsor ${index + 1}`} className="w-auto h-[60px] max-h-[80px] object-contain my-0 mx-auto"/>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SponsorCarousel;