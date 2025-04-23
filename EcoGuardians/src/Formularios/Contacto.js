import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import fondoFormularios from "../componentes/fondoFormularios.png";
import { useTranslation } from "react-i18next";

function Contacto({ mostrarFondo = true, onHandleClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmarContrasena: "",
    ageRange: "18-25",
    country: "",
    region: ""
  });

  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const navigate = useNavigate();
  const sitekey = "6Le0DgYrAAAAABtLCrKvM3IT865eADESGdxLgFod";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!captchaVerified) {
      setMensaje({ texto: t("contact.captcha_error"), tipo: "error" });
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          password: formData.password,
          ageRange: formData.ageRange,
          country: formData.country,
          region: formData.region,
          role: "user"
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.error || "Error en el registro");
  
      setMensaje({ texto: t("contact.success"), tipo: "success" });
  
      // Limpia los campos del formulario
      setFormData({
        name: "",
        username: "",
        password: "",
        confirmarContrasena: "",
        ageRange: "18-25",
        country: "",
        region: ""
      });
  
      // Opcional: Borra el mensaje después de 5 segundos
      setTimeout(() => {
        setMensaje({ texto: "", tipo: "" });
      }, 5000);
  
      // No cerramos el formulario automáticamente
      // El usuario debe cerrarlo manualmente con la X
  
    } catch (error) {
      setMensaje({ texto: error.message, tipo: "error" });
    }
  };
  

  const handleClose = () => {
    if (onHandleClose) {
      onHandleClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 ${mostrarFondo ? "bg-black/50" : "bg-transparent"}`}
      style={
        mostrarFondo
          ? {
              backgroundImage: `url(${fondoFormularios})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }
          : {}
      }
    >
      <div className="w-full max-w-[400px] relative p-6 bg-white rounded-xl shadow-lg backdrop-blur-sm">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-4 top-4 fa-xl text-gray-400 cursor-pointer"
          onClick={handleClose}
        />

        <h2 className="text-center font-semibold text-[22px] mb-4">{t("contact.title")}</h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="name">{t("contact.name")}</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder={t("contact.name_placeholder")} 
                required
                value={formData.name}
                onChange={handleChange}
                className="border-2 border-black p-[6px] px-3 rounded-xl"
                aria-label={t("contact.name")}
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label htmlFor="ageRange">{t("contact.age_range")}</label>
              <select
                id="ageRange"
                name="ageRange"
                required
                value={formData.ageRange}
                onChange={handleChange}
                className="border-2 border-black p-[6px] px-3 rounded-xl"
                aria-label={t("contact.age_range")}
              >
                <option value="0-12">{t("contact.age.0_12")}</option>
                <option value="13-17">{t("contact.age.13_17")}</option>
                <option value="18-25">{t("contact.age.18_25")}</option>
                <option value="26-35">{t("contact.age.26_35")}</option>
                <option value="36-50">{t("contact.age.36_50")}</option>
                <option value="51+">{t("contact.age.51_plus")}</option>
              </select>
            </div>
          </div>

          <label htmlFor="username" className="mt-4 mb-1">{t("contact.email")}</label>
          <input
            id="username"
            type="email"
            name="username"
            placeholder={t("contact.email_placeholder")}
            required
            value={formData.username}
            onChange={handleChange}
            className="border-2 border-black p-[6px] px-3 rounded-xl mb-4"
            aria-label={t("contact.email")}
          />

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="country">{t("contact.country")}</label>
              <input
                id="country"
                type="text"
                name="country"
                placeholder={t("contact.country_placeholder")} 
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full border-2 border-black p-[6px] px-3 rounded-xl"
                aria-label={t("contact.country")}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="region">{t("contact.region")}</label>
              <input
                id="region"
                type="text"
                name="region"
                placeholder={t("contact.region_placeholder")}
                required
                value={formData.region}
                onChange={handleChange}
                className="border-2 border-black p-[6px] px-3 rounded-xl"
                aria-label={t("contact.region")}
              />
            </div>
          </div>

          <ReCAPTCHA
            sitekey={sitekey}
            onChange={(value) => setCaptchaVerified(!!value)}
            className="mt-4"
          />

          {mensaje.texto && (
            <div className={`mt-4 p-2 rounded text-center text-sm ${
              mensaje.tipo === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}>
              {mensaje.texto}
            </div>
          )}

          <button
            type="submit"
            className="bg-verde-claro hover:bg-verde-fuerte mt-6 transition-colors rounded-3xl p-2 text-white font-medium"
            aria-label={t("contact.submit")}
          >
            {t("contact.submit")} 
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Contacto;
