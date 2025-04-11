import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Encabezado from "../InHome/encabezado";
import logo from "../componentes/Videojuego_fondo_frame.png";
import imagenIzquierda from "../componentes/logos_unity.png";
import imagenDerecha from "../componentes/logo_pontificia.png";

function Login() {
  const [visibility, setVisibility] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = useRef(null);
  const recaptchaWidgetId = useRef(null);
  const navigate = useNavigate();

  // reCAPTCHA site key - CLAVE DE SITIO WEB
  const sitekey = "6Le0DgYrAAAAABtLCrKvM3IT865eADESGdxLgFod";

  useEffect(() => {
    // Function that will be called when the reCAPTCHA API is loaded
    window.onRecaptchaLoad = function () {
      if (recaptchaRef.current && !recaptchaWidgetId.current) {
        try {
          recaptchaWidgetId.current = window.grecaptcha.render(
            recaptchaRef.current,
            {
              sitekey: sitekey,
              callback: (response) => {
                setCaptchaVerified(!!response);
              },
              "expired-callback": () => {
                setCaptchaVerified(false);
              },
            }
          );
        } catch (error) {
          console.error("reCAPTCHA error:", error);
          // If there's an error about already being rendered, we can ignore it
        }
      }
    };

    // Check if the script is already in the document
    const existingScript = document.querySelector(
      'script[src*="recaptcha/api.js"]'
    );

    if (!existingScript) {
      // Load the reCAPTCHA script
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      return () => {
        // Clean up when unmounting
        document.head.removeChild(script);
        delete window.onRecaptchaLoad;
      };
    } else if (window.grecaptcha && window.grecaptcha.render) {
      // If the script is already loaded and the API is available
      window.onRecaptchaLoad();
    }
  }, [sitekey]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!captchaVerified) {
      setError("Por favor, verifica que no eres un robot");
      return;
    }

    try {
      // Get the captcha response
      const captchaResponse = window.grecaptcha
        ? window.grecaptcha.getResponse(recaptchaWidgetId.current)
        : "";

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          "g-recaptcha-response": captchaResponse,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If the response is successful, redirect the user
        navigate("/bienvenida");
      } else {
        // If there is an error, show the error message
        setError(data.error || "Ocurrió un error inesperado");
        // Reset the captcha if available
        if (window.grecaptcha) {
          window.grecaptcha.reset(recaptchaWidgetId.current);
        }
        setCaptchaVerified(false);
      }
    } catch (err) {
      setError("Error en la conexión con el servidor");
      // Reset the captcha if available
      if (window.grecaptcha) {
        window.grecaptcha.reset(recaptchaWidgetId.current);
      }
      setCaptchaVerified(false);
    }
  };

  return (
    <motion.section
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col w-full h-screen bg-white overflow-hidden"
    >
      <Encabezado />

      <div className="flex-grow relative">
        {/* Fondo del juego */}
        <img
          src={logo}
          alt="Pantalla del juego"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full ">
          <div className="bg-white border-2 w-[500px] relative p-4 rounded-xl border-verde-claro z-10">
            <FontAwesomeIcon
              icon={faXmark}
              className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
            />

            <h2 className="mx-auto w-fit font-semibold text-[22px]">
              Iniciar sesión
            </h2>

            <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
              {/* Campo correo */}
              <label htmlFor="input-email">Correo electrónico</label>
              <input
                type="email"
                placeholder="Ingresa tu email"
                id="input-email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 border-black p-[2px] px-2 rounded-2xl peer"
                required
                aria-label="Correo electrónico"
              />
              <div className="text-red-500 hidden peer-invalid:block">
                ¡Correo inválido!
              </div>

              {/* Campo contraseña */}
              <label htmlFor="input-contraseña" className="mt-5">
                <div className="flex justify-between">
                  <span>Contraseña</span>
                  <button>He olvidado mi contraseña</button>
                </div>
              </label>

              <div className="relative border-2 border-black rounded-2xl px-2">
                <input
                  className="focus:outline-none peer w-full"
                  type={visibility ? "text" : "password"}
                  id="input-contraseña"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Contraseña"
                />
                <button
                  className="absolute right-2 cursor-pointer"
                  onClick={(event) => {
                    event.preventDefault();
                    setVisibility(!visibility);
                  }}
                  aria-label="Mostrar/Ocultar contraseña"
                >
                  <FontAwesomeIcon icon={visibility ? faEyeSlash : faEye} />
                </button>
                <div className="text-red-500 hidden peer-invalid:block absolute left-0">
                  ¡Contraseña inválida!
                </div>
              </div>

              {/* Recordarme */}
              <div className="mt-6">
                <input type="checkbox" id="recuerdame-checkBox" />
                <label htmlFor="recuerdame-checkBox" className="ml-2">
                  Recuérdame
                </label>
              </div>

              {/* reCAPTCHA */}
              <div className="mt-4">
                <div ref={recaptchaRef}></div>
              </div>

              {/* Registro */}
              <p className="mt-2">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/registro"
                  className="text-verde-fuerte font-semibold hover:underline"
                >
                  Regístrate
                </Link>
              </p>

              {/* Mostrar errores */}
              {error && <div className="text-red-500 mt-2">{error}</div>}

              {/* Botón de iniciar sesión */}
              <button
                type="submit"
                className="bg-verde-claro rounded-3xl p-2 text-white mt-4"
                aria-label="Iniciar sesión"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
          <div className="absolute bottom-4 w-full flex justify-between px-4 sm:px-10">
            <img
              src={imagenIzquierda}
              alt="Logo Unity"
              className="w-[100px] h-[30px] sm:w-[150px] sm:h-[45px] md:w-[220px] md:h-[65px] translate-y-6 sm:translate-y-12 md:translate-y-16 lg:translate-y-20"
            />
            <img
              src={imagenDerecha}
              alt="Logo Universidad"
              className="w-[80px] sm:w-[100px] md:w-[150px] -mr-5 translate-y-0"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Login;
