import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../home.css";

import tecLogo from '../componentes/tec_logo1.png';
import gitlogo from "../componentes/Github.png";
import microsoftLogo from "../componentes/micro.png";


const SponsorCarousel = () => {
  const sponsors = [
    tecLogo,
    gitlogo,
    microsoftLogo,
    tecLogo,
    gitlogo,
    microsoftLogo,
  ];

  return (
    <div className="carrusel-patrocinadores">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={2}
        slidesPerView={window.innerWidth < 768 ? 1 : 4}
        autoplay={{ delay: 3000 }}
        loop
      >
        {sponsors.map((sponsor, index) => (
          <SwiperSlide key={index}>
            <a href="#">
              <img src={sponsor} alt={`Sponsor ${index + 1}`} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SponsorCarousel;