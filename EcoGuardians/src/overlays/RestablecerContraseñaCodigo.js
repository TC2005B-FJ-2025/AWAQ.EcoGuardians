// RestablecerContraseñaCodigo.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RestablecerContraseñaCodigo() {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/verify-code', {
        token: codigo
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        // Si el código es válido, redirige al formulario para cambiar la contraseña
        navigate(`/restablecer-cambio?code=${codigo}`);
      } else {
        setError(response.data.error || 'Código inválido');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al verificar el código');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[500px] border-2 border-verde-claro relative p-4 rounded-xl mx-auto flex flex-col">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
      />
      <h1 className="mx-auto w-fit font-semibold text-[22px] mb-4">
        Restablecer contraseña
      </h1>
      <p className="text-gray-500 mb-4">
        Te hemos enviado el código, revisa tu correo electrónico. Este email puede tardar unos minutos.
      </p>
      <label htmlFor="Restablecer-codigo-id" className="mb-1">
        Código de verificación
      </label>
      <input
        id="Restablecer-codigo-id"
        type="text"
        name="codigo"
        placeholder="Ingresa el código"
        required
        className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      {message && <div className="alert success mb-4">{message}</div>}
      {error && <div className="alert error mb-4">{error}</div>}
      <button type="submit" className="bg-verde-claro rounded-3xl p-2 text-white">
        Validar Código
      </button>
    </form>
  );
}

export default RestablecerContraseñaCodigo;
