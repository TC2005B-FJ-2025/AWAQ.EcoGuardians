import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-center items-center h-screen w-screen bg-white"
    >
      <div className="bg-white border-2 w-[500px] relative p-4 rounded-xl border-verde-claro">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
        />

        <h2 className="mx-auto w-fit font-semibold text-[22px]">
          Iniciar sesión
        </h2>

        <form className="flex flex-col mt-4">
          {/*  Campo correo */}
          <label htmlFor="input-email">Correo electrónico</label>
          <input
            type="email"
            placeholder="Ingresa tu email"
            id="input-email"
            className="border-2 border-black p-[2px] px-2 rounded-2xl peer"
          />
          <div className="text-red-500 hidden peer-invalid:block">
            ¡Correo inválido!
          </div>

          {/*  Campo contraseña */}
          <label htmlFor="input-contraseña" className="mt-5">
            <div className="flex justify-between">
              <span>Contraseña</span>
              <button>He olvidado mi contraseña</button>
            </div>
          </label>

          <div className="relative border-2 border-black rounded-2xl px-2">
            <input
              className="focus:outline-none peer"
              type={visibility ? "text" : "password"}
              id="input-contraseña"
              placeholder="********"
            />
            <button
              className="absolute right-2 cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                setVisibility(!visibility);
              }}
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

          {/* Botón de iniciar sesión */}
          <button
            onClick={(event) => {
              event.preventDefault();
              navigate("/bienvenida");
            }}
            className="bg-verde-claro rounded-3xl p-2 text-white mt-4"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Login;
