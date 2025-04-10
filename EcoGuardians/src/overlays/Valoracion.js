import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

function Valoracion() {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };
  return (
    <div className="w-[354px] border-2 border-verde-claro relative rounded-xl mx-auto flex flex-col px-6 py-4">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
        role="button"
        aria-label="Cerrar ventana"
      ></FontAwesomeIcon>

      <div className="mx-auto w-fit flex items-center flex-col">
        <h2 className="text-lg font-semibold mb-2">¿Te gusta el juego?</h2>
        <p className="mb-2">Tu valoración nos ayuda a mejorar</p>
      </div>

      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill={star <= rating ? "#5F874E" : "none"}
            stroke="#5F874E"
            strokeWidth="1"
            onClick={() => handleStarClick(star)}
            className="cursor-pointer"
            role="button"
            aria-label={`Seleccionar ${star} estrellas`}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      <div className="mb-2 mx-auto" id="problem">
        <p className="text-[15px]">
          ¿Tienes algun problema? 
          <span className="cursor-pointer text-verde-fuerte font-semibold">
            <a href="#problem">Reportar un error</a>
          </span>
        </p>
      </div>

      <button
        className="bg-verde-claro rounded-3xl p-2 text-white"
        disabled={rating === 0}
        aria-disabled={rating === 0}
        aria-label="Enviar valoración"
      >
        Enviar
      </button>
    </div>
  );
}

export default Valoracion;
