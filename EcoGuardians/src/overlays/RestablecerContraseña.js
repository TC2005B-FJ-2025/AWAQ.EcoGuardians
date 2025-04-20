import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function RestablecerContraseña() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email });
      
      if(response.data.success) {
        setMessage(response.data.message);
        // Redirige al componente de verificación del código
        navigate('/restablecer-codigo');  // Asegurate de que la ruta coincida con la definida en tus Routes
      } else {
        setError('Error al enviar el código.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al enviar la solicitud.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[500px] border-2 border-verde-claro relative p-4 rounded-xl mx-auto flex flex-col">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
        />
        <h1 className="mx-auto w-fit font-semibold text-[22px] mb-4">
          Restablecer contraseña
        </h1>
        <p className="text-gray-500 mb-4">
          Te enviaremos un correo electrónico con un código para que puedas elegir una contraseña nueva.
        </p>
        <label htmlFor="Restablecer-email-id" className="mb-1">
          Correo electrónico
        </label>
        <input
          id="Restablecer-email-id"
          type="email"
          name="email"
          placeholder="Ingresa tu email"
          required
          className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {message && <div className="alert success mb-4">{message}</div>}
        {error && <div className="alert error mb-4">{error}</div>}
        <button type="submit" className="bg-verde-claro rounded-3xl p-2 text-white">
          Enviar Correo
        </button>
      </div>
    </form>
  );
}

export default RestablecerContraseña;
