import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SponsorCarousel = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetch("/footer.json")
      .then((res) => res.json())
      .then((data) => setSponsors(data))
      .catch((err) => console.error("Error cargando sponsors:", err));
  }, []);

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
        {sponsors.map((sponsor, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center w-fit">
            <a href={sponsor.link} target="_blank" rel="noreferrer">
              <img
                src={`/imgFooter/${sponsor.filename}`}
                alt={sponsor.alt}
                className="w-auto h-[60px] max-h-[80px] object-contain my-0 mx-auto"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SponsorCarousel;
