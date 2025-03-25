import { useState } from "react";
import "./Registro_Form.css";

export default function RegistroForm() {
  const [formData, setFormData] = useState({
    username: "",
    minAge: "",
    password: "",
    confirmarContrasena: "",
    country: "",
    region: "",
    role: "user",
  });

  const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes de éxito o error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmarContrasena) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          role: formData.role,
          name: formData.username, // Se usa el mismo nombre que username
          minAge: formData.minAge,
          country: formData.country,
          region: formData.region,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("Usuario registrado exitosamente.");
        setFormData({
          username: "",
          minAge: "",
          password: "",
          confirmarContrasena: "",
          country: "",
          region: "",
          role: "user",
        });
      } else {
        setMensaje(data.error || "Error en el registro.");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2 className="title">Registro</h2>
        {mensaje && <p className="message">{mensaje}</p>}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="minAge"
            placeholder="Edad"
            value={formData.minAge}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmarContrasena"
            placeholder="Confirmar contraseña"
            value={formData.confirmarContrasena}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="País"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="region"
            placeholder="Región"
            value={formData.region}
            onChange={handleChange}
            required
          />
          <button type="submit" className="button">Registrarse</button>
          <p className="login-text">
            ¿Ya tienes una cuenta? <span className="link">Inicia sesión</span>
          </p>
        </form>
      </div>
    </div>
  );
}
