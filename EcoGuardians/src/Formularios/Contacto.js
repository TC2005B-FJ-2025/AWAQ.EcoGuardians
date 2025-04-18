import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
  const recaptchaRef = useRef(null);
  const recaptchaWidgetId = useRef(null);
  const navigate = useNavigate();

  const sitekey = "6Le0DgYrAAAAABtLCrKvM3IT865eADESGdxLgFod";

  // Cargar el script de reCAPTCHA una vez que el componente se monte
  useEffect(() => {
    const existingScript = document.querySelector('script[src*="recaptcha/api.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    window.onRecaptchaLoad = () => {
      if (recaptchaRef.current && !recaptchaWidgetId.current) {
        recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: sitekey,
          callback: (response) => {
            setCaptchaVerified(!!response);
          },
          "expired-callback": () => {
            setCaptchaVerified(false);
          }
        });
      }
    };

    return () => {
      const script = document.querySelector('script[src*="recaptcha/api.js"]');
      if (script) {
        script.remove();
      }
      delete window.onRecaptchaLoad;
    };
  }, []);

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

      if (!response.ok) {
        throw new Error(data.error || "Error en el registro");
      }

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
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-center items-center bg-white"
    >
      <div className="w-[500px] relative p-4 ">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
          onClick={handleClose}
        />

        <h2 className="mx-auto w-fit font-semibold text-[22px]">Únete a nuestra red de contactos</h2>

        <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-4">
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
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
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
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
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

          <label htmlFor="username" className="mb-2">Correo Electrónico</label>
          <input
            id="username"
            type="email"
            name="username"
            placeholder="tucorreo@ejemplo.com"
            required
            value={formData.username}
            onChange={handleChange}
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
          />

          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="country">País</label>
              <input
                id="country"
                type="text"
                name="country"
                placeholder="Tu país"
                required
                value={formData.country}
                onChange={handleChange}
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="region">Región/Estado</label>
              <input
                id="region"
                type="text"
                name="region"
                placeholder="Tu región o estado"
                required
                value={formData.region}
                onChange={handleChange}
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
              />
            </div>
          </div>

          <div ref={recaptchaRef} className="mb-4"></div>

          {mensaje.texto && (
            <div className={`mt-2 p-2 rounded text-center ${
              mensaje.tipo === "error" 
                ? "bg-red-100 text-red-700" 
                : "bg-green-100 text-green-700"
            }`}>
              {mensaje.texto}
            </div>
          )}

          <button
            type="submit"
            className="bg-verde-claro hover:bg-verde-fuerte transition-colores rounded-3xl p-2 text-white mt-4 font-medium"
            onClick={handleSubmit}
          >
            Unirme
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Contacto;