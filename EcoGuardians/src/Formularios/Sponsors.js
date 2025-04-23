import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import fondoFormularios from "../componentes/fondoFormularios.png";
import { useTranslation } from "react-i18next"; 

function SponsorsForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    url: '',
    razones: ''
  });

  const [mensaje, setMensaje] = useState({
    texto: "",
    tipo: "" // "exito" o "error"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.url || !formData.razones) {
      setMensaje({ texto: t("sponsorForm.complete_all"), tipo: "error" });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      //const data = await response.json();

      if (response.ok) {
        setMensaje({ texto: t("sponsorForm.success"), tipo: "exito" });

        setFormData({
          name: '',
          email: '',
          url: '',
          razones: ''
        });

        setTimeout(() => {
          navigate(-1);
        }, 2500);
      } else {
        setMensaje({ texto: t("sponsorForm.error"), tipo: "error" });
      }
    } catch (error) {
      setMensaje({ texto: t("sponsorForm.error") + error.message, tipo: "error" });
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50"
      style={{
        backgroundImage: `url(${fondoFormularios})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="w-[500px] border-2 border-verde-claro bg-white rounded-xl shadow-lg relative p-4">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
          onClick={handleClose}
        />

        <h2 className="mx-auto w-fit font-semibold text-[22px]">{t("sponsorForm.title")}</h2>

        <AnimatePresence>
          {mensaje.texto && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className={`mt-4 mb-2 p-3 rounded text-center text-sm font-medium ${
                mensaje.tipo === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {mensaje.texto}
            </motion.div>
          )}
        </AnimatePresence>

        <form
          className="flex flex-col mt-2"
          onSubmit={handleSubmit}
          aria-label={t("sponsorForm.title")}
        >
          <label htmlFor="name" className="mb-2">{t("sponsorForm.name")}</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder={t("sponsorForm.name_placeholder")}
            required
            value={formData.name}
            onChange={handleChange}
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
            aria-label={t("sponsorForm.name")}
          />

          <label htmlFor="email" className="mb-2">{t("sponsorForm.email")}</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder={t("sponsorForm.email_placeholder")}
            required
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
            aria-label={t("sponsorForm.email")}
          />

          <label htmlFor="url" className="mb-2">{t("sponsorForm.website")}</label>
          <input
            id="url"
            type="url"
            name="url"
            placeholder={t("sponsorForm.website_placeholder")} 
            required
            value={formData.url}
            onChange={handleChange}
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
            aria-label={t("sponsorForm.website")}
          />

          <label htmlFor="razones" className="mb-2">{t("sponsorForm.reasons")}</label>
          <textarea
            id="razones"
            name="razones"
            placeholder={t("sponsorForm.reasons_placeholder")} 
            required
            value={formData.razones}
            onChange={handleChange}
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
            aria-label={t("sponsorForm.reasons")}
          ></textarea>

          <button
            type="submit"
            className="bg-verde-claro hover:bg-verde-fuerte transition-colores rounded-3xl p-2 text-white mt-4 font-medium"
            aria-label={t("sponsorForm.submit")}
          >
            {t("sponsorForm.submit")}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default SponsorsForm;
