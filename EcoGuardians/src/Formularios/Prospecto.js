import React from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import fondoFormularios from "../componentes/fondoFormularios.png";
import { useTranslation } from "react-i18next";

const Prospecto = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${fondoFormularios})` }}
      aria-labelledby="prospecto-title"
      aria-describedby="prospecto-description"
    >
      <div
        className="w-full max-w-md border-2 border-verde-claro p-6 rounded-xl shadow-xl bg-white relative backdrop-blur-sm"
        role="dialog"
        aria-labelledby="prospecto-title"
        aria-describedby="prospecto-description"
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-3 top-3 fa-xl text-gray-400 cursor-pointer"
          onClick={handleClose}
          aria-label={t("prospect.close")}
        />

        <Helmet>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        </Helmet>

        <h2
          id="prospecto-title"
          className="text-center font-bold text-2xl text-gray-800 mb-6"
        >
          {t("prospect.title")}
        </h2>

        <form
          action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DgK0000000Wp8"
          method="POST"
          className="flex flex-col gap-4"
          aria-labelledby="prospecto-title"
        >
          <input type="hidden" name="oid" value="00DgK0000000Wp8" />
          <input type="hidden" name="retURL" value="https://www.somosawaq.org/" />
          <input type="hidden" name="assignmentRule" value="1" />

          <div className="flex flex-col">
            <label
              htmlFor="00NgK00000vNcLV"
              className="mb-1 text-gray-700 font-medium"
            >
              {t("prospect.name")}
            </label>
            <textarea
              id="00NgK00000vNcLV"
              name="00NgK00000vNcLV"
              wrap="soft"
              placeholder={t("prospect.name_placeholder")}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-verde-claro transition-all placeholder-gray-400 h-10"
              aria-required="true"
              aria-describedby="name-description"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="00NgK00000vKmpM"
              className="mb-1 text-gray-700 font-medium"
            >
              {t("prospect.email")}
            </label>
            <input
              id="00NgK00000vKmpM"
              name="00NgK00000vKmpM"
              type="email"
              maxLength="80"
              placeholder={t("prospect.email_placeholder")}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-verde-claro transition-all placeholder-gray-400 h-10"
              aria-required="true"
              aria-describedby="email-description"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="00NgK00000vL4JG"
              className="mb-1 text-gray-700 font-medium"
            >
              {t("prospect.description")}
            </label>
            <textarea
              id="00NgK00000vL4JG"
              name="00NgK00000vL4JG"
              wrap="soft"
              rows="4"
              placeholder={t("prospect.description_placeholder")}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-verde-claro transition-all placeholder-gray-400"
              aria-required="true"
              aria-describedby="description-description"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-verde-claro hover:bg-verde-fuerte transition-colors rounded-lg py-3 px-4 text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform mt-2"
            aria-label={t("prospect.submit")}
          >
            {t("prospect.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Prospecto;