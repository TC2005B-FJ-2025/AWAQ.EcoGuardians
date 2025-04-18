import React from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Prospecto = () => {
  const navigate = useNavigate();

  // Función para manejar el cierre
  const handleClose = () => {
    navigate(-1); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 relative bg-gray-50">
      <div className="w-full max-w-md border-2 border-verde-claro p-6 rounded-xl shadow-lg bg-white relative">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
          onClick={handleClose}
        />

        <Helmet>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        </Helmet>

        <h2 className="mx-auto w-fit font-bold text-2xl text-gray-800 mb-6 text-center">Contáctanos</h2>

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
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-verde-claro focus:border-transparent transition-all placeholder-gray-400 h-10" // Altura reducida
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="00NgK00000vKmpM" className="mb-1 text-gray-700 font-medium">Email:</label>
            <input
              id="00NgK00000vKmpM"
              name="00NgK00000vKmpM"
              type="email"
              size="20"
              maxLength="80"
              placeholder="ejemplo@email.com"
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-verde-claro focus:border-transparent transition-all placeholder-gray-400 h-10" // Altura definida
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
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-verde-claro focus:border-transparent transition-all placeholder-gray-400"
            />
          </div>

          <div className="mt-2">
            <button 
              type="submit"
              className="w-full bg-verde-claro hover:bg-verde-fuerte transition-colors rounded-lg py-3 px-4 text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
            >
              Enviar Solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Prospecto;