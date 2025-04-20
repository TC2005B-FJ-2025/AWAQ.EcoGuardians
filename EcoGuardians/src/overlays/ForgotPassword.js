import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/forgot-password', { 
        email 
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        setMessage(response.data.message);
        
        // Quitar la línea que imprime el token en consola, 
        // porque con el nuevo flujo de 6 dígitos no devuelves token
        // console.log("Reset token (dev only):", response.data.token);
        
        // Redirigir a la pantalla de ingresar código
        // Si prefieres que sea inmediato, quita el setTimeout y haz navigate('/restablecer-codigo') directamente.
        setTimeout(() => navigate('/restablecer-codigo'), 3000);

      } else {
        setError(response.data.error || 'Unknown error occurred');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 
                      err.message || 
                      'Error al enviar la solicitud. Por favor intente nuevamente.';
      setError(errorMsg);
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Recuperación de Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ingrese su email registrado"
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className={`submit-btn ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? (
            <span className="spinner">Enviando...</span>
          ) : (
            'Enviar Código'
          )}
        </button>
      </form>
      
      {message && (
        <div className="alert success">
          <p>{message}</p>
        </div>
      )}
      
      {error && (
        <div className="alert error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
