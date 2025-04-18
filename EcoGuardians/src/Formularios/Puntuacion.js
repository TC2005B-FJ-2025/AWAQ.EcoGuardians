import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Puntuacion() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    setError("");
  };

  const handleEnviar = async () => {
    try {
      const response = await fetch("http://localhost:5000/valoracion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ puntuacion: rating }),
      });

      const data = await response.json();

      if (response.ok) {
        setEnviado(true);
      } else {
        setError(data.error || "Error al enviar la valoración");
      }
    } catch (err) {
      console.error("Error de red:", err);
      setError("Error de red al enviar la valoración");
    }
  };

  const handleClose = () => {
    navigate(-1); 
  };

  return (
    <div className="w-[354px] border-2 border-verde-claro relative rounded-xl mx-auto flex flex-col px-6 py-4">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
        onClick={handleClose}
      />

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
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mb-2">{error}</p>
      )}

      {enviado ? (
        <p className="text-green-600 font-semibold text-center">
          ¡Gracias por tu valoración!
        </p>
      ) : (
        <>
          <div className="mb-2 mx-auto" id="problem">
            <p className="text-[15px]">
              ¿Tienes algún problema?{" "}
              <span className="cursor-pointer text-verde-fuerte font-semibold"
              onClick={() => navigate("/CrearCaso")}
              >
                Reportar un error
              </span>
            </p>
          </div>

          <button
            className={`bg-verde-claro rounded-3xl p-2 text-white ${
              rating === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleEnviar}
            disabled={rating === 0}
          >
            Enviar
          </button>
        </>
      )}
    </div>
  );
}

export default Puntuacion;