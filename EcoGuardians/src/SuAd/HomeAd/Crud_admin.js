import React, { useState, useEffect } from 'react';
import './Crud_admin.css'; // Importamos los estilos CSS

export function AdministracionAWAQ() {
  // Estados del componente
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    age_range: '',
    country: '',
    region: ''
  });

  // Función para obtener administradores con manejo de errores
  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/administradores');
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('La respuesta no es un array válido');
      }
      
      setAdmins(data);
      setError(null);
    } catch (err) {
      console.error('Error al obtener administradores:', err);
      setError(err.message);
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/administradores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Error al agregar administrador');
      }
      
      await fetchAdmins();
      setFormData({
        name: '',
        username: '',
        password: '',
        age_range: '',
        country: '',
        region: ''
      });
      
    } catch (err) {
      console.error('Error al enviar formulario:', err);
      setError(err.message);
    }
  };

  const handleDelete = async (username) => {
    if (window.confirm('¿Está seguro de eliminar este administrador?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/administradores/${username}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Error al eliminar administrador');
        }
        
        await fetchAdmins();
        
      } catch (err) {
        console.error('Error al eliminar:', err);
        setError(err.message);
      }
    }
  };

  const toggleStatus = async (username, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/administradores/${username}/estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: !currentStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Error al cambiar estado');
      }
      
      await fetchAdmins();
      
    } catch (err) {
      console.error('Error al cambiar estado:', err);
      setError(err.message);
    }
  };

  const getAgeRange = (age) => {
    switch(age) {
      case 12: return '0-12';
      case 17: return '13-17';
      case 25: return '18-25';
      case 35: return '26-35';
      case 50: return '36-50';
      case 99: return '51+';
      default: return `${age}`;
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Administración de AWAQ</h1>
      
      {error && (
        <div className="error-message">
          Error: {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}
      
      {/* Formulario de registro */}
      <div>
        <h2 className="section-title">Registrar nuevo administrador</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre completo:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Nombre de usuario:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Rango de edad objetivo:</label>
            <select
              name="age_range"
              value={formData.age_range}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Seleccione un rango</option>
              <option value="0-12">0-12 años</option>
              <option value="13-17">13-17 años</option>
              <option value="18-25">18-25 años</option>
              <option value="26-35">26-35 años</option>
              <option value="36-50">36-50 años</option>
              <option value="51+">51+ años</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>País:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Región:</label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="submit-button">
            Registrar Administrador
          </button>
        </form>
      </div>

      {/* Tabla de administradores */}
      <div>
        <h2 className="section-title">Administradores registrados</h2>
        
        {loading ? (
          <div className="loading-state">Cargando administradores...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Edad objetivo</th>
                <th>País</th>
                <th>Región</th>
                <th>Fecha registro</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin.username}>
                    <td>{admin.username}</td>
                    <td>{admin.name}</td>
                    <td>{getAgeRange(admin.minAge)} años</td>
                    <td>{admin.country}</td>
                    <td>{admin.region}</td>
                    <td>{new Date(admin.creationDate).toLocaleDateString()}</td>
                    <td className={admin.active ? 'active-status' : 'inactive-status'}>
                      {admin.active ? 'Activo' : 'Inactivo'}
                    </td>
                    <td>
                      <button
                        onClick={() => toggleStatus(admin.username, admin.active)}
                        className="status-button"
                      >
                        {admin.active ? 'Desactivar' : 'Activar'}
                      </button>
                      <button
                        onClick={() => handleDelete(admin.username)}
                        className="delete-button"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                    No hay administradores registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdministracionAWAQ;