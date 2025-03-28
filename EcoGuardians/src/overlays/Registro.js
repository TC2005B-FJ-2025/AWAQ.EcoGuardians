import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion"; 
import { Link, useNavigate } from "react-router-dom";

function Registro() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-center items-center h-screen w-screen bg-white"
    >
      <div className="w-[500px] border-2 border-verde-claro relative p-4 rounded-xl">
        {/* Botón de cerrar (X) */}
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
          onClick={() => navigate("/")} 
        />

        <h2 className="mx-auto w-fit font-semibold text-[22px]">Registro</h2>

        <form className="flex flex-col mt-4">
          {/* Campos Nombre y Edad */}
          <div className="flex justify-between gap-4">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="username-id">Nombre</label>
              <input
                id="username-id"
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                required
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="edad-id">Edad</label>
              <input
                id="edad-id"
                type="number"
                name="minAge"
                placeholder="Edad"
                required
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
              />
            </div>
          </div>

          {/* Email */}
          <label htmlFor="id-email" className="mb-2">Email</label>
          <input
            id="id-email"
            type="email"
            name="email"
            placeholder="example123@email.com"
            required
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
          />

          {/* Contraseña */}
          <label htmlFor="id-password" className="mb-2">Contraseña</label>
          <input
            id="id-password"
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
          />

          {/* Confirmar contraseña */}
          <label htmlFor="id-confirmar" className="mb-2">Confirmar Contraseña</label>
          <input
            id="id-confirmar"
            type="password"
            name="confirmarContrasena"
            placeholder="Confirmar contraseña"
            required
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
          />

          {/* País y Ciudad */}
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="country-id">País</label>
              <input
                id="country-id"
                type="text"
                name="country"
                placeholder="País"
                required
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="ciudad-id">Ciudad</label>
              <input
                id="ciudad-id"
                type="text"
                name="ciudad"
                placeholder="Ciudad"
                required
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
              />
            </div>
          </div>

          {/* Link para volver al login */}
          <p className="mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-verde-fuerte font-semibold hover:underline">
              Inicia sesión
            </Link>
          </p>

          {/* Botón de registro */}
          <button
            type="submit"
            className="bg-verde-claro rounded-3xl p-2 text-white mt-4"
          >
            Registrarse
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Registro;
