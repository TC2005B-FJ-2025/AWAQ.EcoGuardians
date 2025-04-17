import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay} from "swiper/modules";
import Videojuegofondo1 from "../componentes/Videojuego_fondo_frame.png";
import Videojuegofondo2 from "../componentes/Videojuego_fondo2.png";
import Videojuegofondo3 from "../componentes/Videojuego_fondo3.png";
import Videojuegofondo4 from "../componentes/Videojuego_fondo4.png";
import Videojuegofondo5 from "../componentes/Videojuego_fondo5.png";

const images = [
  Videojuegofondo1,
  Videojuegofondo2,
  Videojuegofondo3,
  Videojuegofondo4,
  Videojuegofondo5,
];

export default function SwipperImages() {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      className="h-full"
      autoplay={{ delay: 3000 }}
      allowTouchMove={false}
      loop={true}
    >
      {images.map((Image, index) => {
        return (
          <SwiperSlide key={index} className="w-full h-full">
            <img
              src={Image}
              alt="Captura de pantalla videojuego"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
