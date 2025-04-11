import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate

function SponsorsForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    url: '',
    razones: ''
  });

  const navigate = useNavigate(); // Usa el hook useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que los campos requeridos no estén vacíos
    if (!formData.name || !formData.email || !formData.url || !formData.razones) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Solicitud de Sponsor creado con éxito");
        // Limpiar el formulario después de enviar
        setFormData({
          name: '',
          email: '',
          url: '',
          razones: ''
        });
      } else {
        alert("Hubo un problema al crear la solicitud de sponsor. Intenta nuevamente.");
      }
    } catch (error) {
      alert("Error al crear solicitud de sponsor: " + error.message);
    }
  };

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-center items-center h-screen w-screen bg-white"
    >
      <div className="w-[500px] border-2 border-verde-claro relative p-4 rounded-xl">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
          onClick={() => navigate("/")} // Usa navigate aquí
        />
        
        <h2 className="mx-auto w-fit font-semibold text-[22px]">Solicitud de Sponsor</h2>

        <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
          <label htmlFor="name" className="mb-2">Nombre Completo</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Nombre De la Empresa/Contacto"
            required
            value={formData.name}
            onChange={handleChange}
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
          />

          <label htmlFor="email" className="mb-2">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="tucorreo@ejemplo.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
          />

          <label htmlFor="url" className="mb-2">Sitio Web</label>
          <input
            id="url"
            type="url"
            name="url"
            placeholder="https://www.ejemplo.com"
            required
            value={formData.url}
            onChange={handleChange}
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
          />

          <label htmlFor="razones" className="mb-2">Razones para patrocinar</label>
          <textarea
            id="razones"
            name="razones"
            placeholder="Explique las razones para patrocinar"
            required
            value={formData.razones}
            onChange={handleChange}
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
          ></textarea>

          <button
            type="submit"
            className="bg-verde-claro hover:bg-verde-fuerte transition-colores rounded-3xl p-2 text-white mt-4 font-medium"
          >
            Crear Solicitud
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default SponsorsForm;