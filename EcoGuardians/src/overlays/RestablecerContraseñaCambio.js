// RestablecerContraseñaCambio.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function RestablecerContraseñaCambio() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extraer el código de la URL
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/reset-password', {
        token: code,
        new_password: password
      });

      if (response.data.success) {
        setMessage('Contraseña actualizada exitosamente');
        setTimeout(() => navigate('/restablecer-final'), 2000);
      } else {
        setError(response.data.error || 'Error desconocido');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar la contraseña');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[500px] border-2 border-verde-claro relative p-4 rounded-xl mx-auto flex flex-col">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
      />
      <h1 className="mx-auto w-fit font-semibold text-[22px] mb-6">
        Restablecer contraseña
      </h1>
      <p className="text-gray-500 mb-7">Elige una contraseña nueva</p>
      <label htmlFor="id-password-cambio" className="mb-2">
        Contraseña Nueva
      </label>
      <input
        id="id-password-cambio"
        type="password"
        name="password"
        placeholder="********"
        required
        className="border-2 border-black p-[2px] px-2 rounded-2xl mb-7"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="id-confirmar-cambio" className="mb-2">
        Confirmar Contraseña nueva
      </label>
      <input
        id="id-confirmar-cambio"
        type="password"
        name="confirmarContrasena"
        placeholder="********"
        required
        className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      {message && <div className="alert success mb-4">{message}</div>}
      {error && <div className="alert error mb-4">{error}</div>}
      <button type="submit" className="bg-verde-claro rounded-3xl p-2 text-white">
        Restablecer contraseña
      </button>
    </form>
  );
}

export default RestablecerContraseñaCambio;
