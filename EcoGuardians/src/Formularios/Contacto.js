import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import fondoFormularios from "../componentes/fondoFormularios.png";

function Contacto() {
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
      setMensaje({ texto: "Por favor, verifica que no eres un robot", tipo: "error" });
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

      setMensaje({ texto: "¡Registro exitoso!", tipo: "success" });

      setTimeout(() => {
        setFormData({
          name: "",
          username: "",
          password: "",
          confirmarContrasena: "",
          ageRange: "18-25",
          country: "",
          region: ""
        });
        navigate(-1);
      }, 2000);

    } catch (error) {
      setMensaje({ texto: error.message, tipo: "error" });
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
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/50"
      style={{
        backgroundImage: `url(${fondoFormularios})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="w-full max-w-[400px] relative p-6 bg-white rounded-xl shadow-lg backdrop-blur-sm">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-4 top-4 fa-xl text-gray-400 cursor-pointer"
          onClick={handleClose}
        />

        <h2 className="text-center font-semibold text-[22px] mb-4">Únete a nuestra red de contactos</h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="name">Nombre Completo</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Tu nombre completo"
                required
                value={formData.name}
                onChange={handleChange}
                className="border-2 border-black p-[6px] px-3 rounded-xl"
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label htmlFor="ageRange">Rango de Edad</label>
              <select
                id="ageRange"
                name="ageRange"
                required
                value={formData.ageRange}
                onChange={handleChange}
                className="border-2 border-black p-[6px] px-3 rounded-xl"
              >
                <option value="0-12">0-12 años</option>
                <option value="13-17">13-17 años</option>
                <option value="18-25">18-25 años</option>
                <option value="26-35">26-35 años</option>
                <option value="36-50">36-50 años</option>
                <option value="51+">51+ años</option>
              </select>
            </div>
          </div>

          <label htmlFor="username" className="mt-4 mb-1">Correo Electrónico</label>
          <input
            id="username"
            type="email"
            name="username"
            placeholder="tucorreo@ejemplo.com"
            required
            value={formData.username}
            onChange={handleChange}
            className="border-2 border-black p-[6px] px-3 rounded-xl mb-4"
          />

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="country">País</label>
              <input
                id="country"
                type="text"
                name="country"
                placeholder="Tu país"
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full border-2 border-black p-[6px] px-3 rounded-xl"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="w-full region">Región/Estado</label>
              <input
                id="region"
                type="text"
                name="region"
                placeholder="Tu región o estado"
                required
                value={formData.region}
                onChange={handleChange}
                className="border-2 border-black p-[6px] px-3 rounded-xl"
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
          >
            Unirme
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Contacto;
