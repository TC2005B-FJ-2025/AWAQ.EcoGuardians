import React from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import fondoFormularios from "../componentes/fondoFormularios.png";

const Prospecto = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${fondoFormularios})` }}
    >
      <div className="w-full max-w-md border-2 border-verde-claro p-6 rounded-xl shadow-xl bg-white relative backdrop-blur-sm">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-3 top-3 fa-xl text-gray-400 cursor-pointer"
          onClick={handleClose}
        />

        <Helmet>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        </Helmet>

        <h2 className="text-center font-bold text-2xl text-gray-800 mb-6">Contáctanos</h2>

        <form
          action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DgK0000000Wp8"
          method="POST"
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="oid" value="00DgK0000000Wp8" />
          <input type="hidden" name="retURL" value="http://www.hannah.lovestoblog.com" />
          <input type="hidden" name="assignmentRule" value="1" />

          <div className="flex flex-col">
            <label htmlFor="00NgK00000vNcLV" className="mb-1 text-gray-700 font-medium">Nombre:</label>
            <textarea
              id="00NgK00000vNcLV"
              name="00NgK00000vNcLV"
              wrap="soft"
              placeholder="Ingresa tu nombre completo"
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-verde-claro transition-all placeholder-gray-400 h-10"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="00NgK00000vKmpM" className="mb-1 text-gray-700 font-medium">Email:</label>
            <input
              id="00NgK00000vKmpM"
              name="00NgK00000vKmpM"
              type="email"
              maxLength="80"
              placeholder="ejemplo@email.com"
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-verde-claro transition-all placeholder-gray-400 h-10"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="00NgK00000vL4JG" className="mb-1 text-gray-700 font-medium">Descripción:</label>
            <textarea
              id="00NgK00000vL4JG"
              name="00NgK00000vL4JG"
              wrap="soft"
              rows="4"
              placeholder="Describe tu consulta o solicitud"
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-verde-claro transition-all placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-verde-claro hover:bg-verde-fuerte transition-colors rounded-lg py-3 px-4 text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform mt-2"
          >
            Enviar Solicitud
          </button>
        </form>
      </div>
    </div>
  );
};

export default Prospecto;
