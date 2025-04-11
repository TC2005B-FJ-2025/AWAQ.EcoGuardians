import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Encabezado from "../../InHome/encabezado";
import logo from "../componentes/Videojuego_fondo_frame.png";
import imagenIzquierda from "../componentes/logos_unity.png";
import imagenDerecha from "../componentes/logo_pontificia.png";

function Registro() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmarContrasena: "",
    ageRange: "18-25", // Valor por defecto
    country: "",
    region: "",
  });

  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (formData.password !== formData.confirmarContrasena) {
      setMensaje({ texto: "Las contraseñas no coinciden", tipo: "error" });
      return;
    }

    if (formData.password.length < 6) {
      setMensaje({
        texto: "La contraseña debe tener al menos 6 caracteres",
        tipo: "error",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.email, // El email es el username
          password: formData.password,
          ageRange: formData.ageRange, // Enviamos el rango directamente
          country: formData.country,
          region: formData.region,
          role: "user", // Todos los registros son usuarios normales por defecto
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en el registro");
      }

      setMensaje({ texto: "¡Registro exitoso!", tipo: "success" });

      // Limpiar formulario después de 2 segundos
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmarContrasena: "",
          ageRange: "18-25",
          country: "",
          region: "",
        });
        navigate("/login"); // Redirigir a login
      }, 2000);
    } catch (error) {
      setMensaje({ texto: error.message, tipo: "error" });
    }
  };

  return (
    <motion.div
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

        <div className="relative z-10 flex flex-col items-center justify-center h-full ">
          <div className="w-[500px] border-2 border-verde-claro relative p-4 rounded-xl bg-white z-10">
            <FontAwesomeIcon
              icon={faXmark}
              className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
              onClick={() => navigate("/")}
            />

            <h2 className="mx-auto w-fit font-semibold text-[22px]">
              Registro
            </h2>

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
                    aria-label="Nombre completo"
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

              <label htmlFor="email" className="mb-2">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="tucorreo@ejemplo.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
                aria-label="Correo electrónico"
              />

              <label htmlFor="password" className="mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
              />

              <label htmlFor="confirmarContrasena" className="mb-2">
                Confirmar Contraseña
              </label>
              <input
                id="confirmarContrasena"
                type="password"
                name="confirmarContrasena"
                placeholder="Confirma tu contraseña"
                required
                minLength={6}
                value={formData.confirmarContrasena}
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

              {mensaje.texto && (
                <div
                  className={`mt-2 p-2 rounded text-center ${
                    mensaje.tipo === "error"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {mensaje.texto}
                </div>
              )}

              <p className="mt-4 text-center">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="text-verde-fuerte font-semibold hover:underline"
                >
                  Inicia sesión aquí
                </Link>
              </p>

              <button
                type="submit"
                className="bg-verde-claro hover:bg-verde-fuerte transition-colors rounded-3xl p-2 text-white mt-4 font-medium"
                aria-label="Registrarse"
              >
                Registrarse
              </button>
            </form>
          </div>
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
    </motion.div>
  );
}

export default Registro;
