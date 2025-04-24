import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import fondoFormularios from "../componentes/fondoFormularios.png";
import { useTranslation } from "react-i18next";

const Prospecto = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    descripción: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleClose = () => {
    navigate(-1); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/prospecto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage({
          type: 'success',
          text: t("prospect.Success")
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          descripción: ''
        });
      } else {
        setSubmitMessage({
          type: 'error',
          text: data.error || t("prospect.errorForms")
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: t("prospect.errorConexion")
      });
    } finally {
      setIsSubmitting(false);
    }
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
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-gray-700 font-medium">{t("prospect.name")}</label>
            <textarea 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              wrap="soft" 
              placeholder={t("prospect.name_placeholder")}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-verde-claro focus:border-transparent transition-all placeholder-gray-400 h-10"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-700 font-medium">{t("prospect.email")}</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              maxLength="80"
              placeholder={t("prospect.email_placeholder")}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-verde-claro focus:border-transparent transition-all placeholder-gray-400 h-10"
              required
            />
            <input type="hidden" name="assigmentRule" value="1" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="descripción" className="mb-1 text-gray-700 font-medium">{t("prospect.description")}</label>
            <textarea 
              id="descripción" 
              name="descripción" 
              value={formData.descripción}
              onChange={handleChange}
              wrap="soft" 
              rows="4"
              placeholder={t("prospect.description_placeholder")}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-verde-claro focus:border-transparent transition-all placeholder-gray-400"
              required
            />
          </div>

          {submitMessage && (
            <div className={`p-3 rounded-lg text-center ${
              submitMessage.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {submitMessage.text}
            </div>
          )}

          <div className="mt-2">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-verde-claro hover:bg-verde-fuerte rounded-lg py-3 px-4 text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? t("prospect.sending") : t("prospect.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Prospecto;