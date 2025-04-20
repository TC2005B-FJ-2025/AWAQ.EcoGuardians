// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
 // Opcional: para tus estilos personalizados

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extraer el token de la URL, por ejemplo: /reset-password?token=TU_TOKEN
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validar que ambas contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/reset-password',
        {
          token,
          new_password: newPassword,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.success) {
        setMessage('Contraseña actualizada exitosamente. Redirigiendo al login...');
        // Redirigir al login después de unos segundos
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(response.data.error || 'Error desconocido');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar la contraseña');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label htmlFor="new-password">Nueva Contraseña:</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Ingresa tu nueva contraseña"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirma tu nueva contraseña"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
        </button>
      </form>
      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}
    </div>
  );
};

export default ResetPassword;
