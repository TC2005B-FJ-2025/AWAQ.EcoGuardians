import { useState } from "react";
import "./LogAd.css";

const LogAd = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/loginAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.error) {
        setMessage({ text: data.error, type: "error" });
      } else {
        setMessage({ text: "Inicio de sesión exitoso!", type: "success" });
        setTimeout(() => {
          window.location.href = "crud.html";
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: "Error al conectar con el servidor.", type: "error" });
    }
  };

  return (
    <div className="login-container">
      <h1>Inicio de Sesión - Administrador</h1>
      <p>Si eres un administrador, ingresa aquí:</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Iniciar Sesión</button>
      </form>

      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
    </div>
  );
};

export default LogAd;
