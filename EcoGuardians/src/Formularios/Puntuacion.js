import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondoFormularios from "../componentes/fondoFormularios.png";
import { useTranslation } from "react-i18next";

function Puntuacion() {
  const { t } = useTranslation();
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
        setError(data.error || t("puntuacion.error_envio"));
      }
    } catch (err) {
      console.error(t("puntuacion.error_red"), err);
      setError(t("puntuacion.error_red"));
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
      style={{
        backgroundImage: `url(${fondoFormularios})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
    <div className="w-full max-w-sm border-2 border-verde-claro relative rounded-xl mx-auto flex flex-col px-6 py-6 sm:px-8 bg-white shadow-md">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute right-3 top-3 fa-xl text-gray-400 cursor-pointer"
        onClick={handleClose}
      />

      <div className="mx-auto w-full text-center">
        <h2 className="text-lg font-semibold mb-2">{t("puntuacion.gusta")}</h2>
        <p className="mb-2">{t("puntuacion.valoracion")}</p>
      </div>

      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
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
          {t("puntuacion.gracias")}
        </p>
      ) : (
        <>
          <div className="mb-2 mx-auto text-center">
            <p className="text-[15px]">
              {t("puntuacion.problema")}{" "}
              <span
                className="cursor-pointer text-verde-fuerte font-semibold"
                onClick={() => navigate("/CrearCaso")}
              >
                {t("puntuacion.reportar")}
              </span>
            </p>
          </div>

          <button
            className={`bg-verde-claro rounded-3xl p-2 text-white transition duration-300 ${
              rating === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-verde-fuerte"
            }`}
            onClick={handleEnviar}
            disabled={rating === 0}
          >
            {t("puntuacion.Enviar")}
          </button>
        </>
      )}
    </div>
    </div>
  );
}

export default Puntuacion;
