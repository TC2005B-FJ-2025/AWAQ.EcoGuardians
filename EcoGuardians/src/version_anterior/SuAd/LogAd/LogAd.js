import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LogAd.css";

function LogAd() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = useRef(null);
  const recaptchaWidgetId = useRef(null);
  const navigate = useNavigate();

  // reCAPTCHA site key
  const sitekey = "6Le0DgYrAAAAABtLCrKvM3IT865eADESGdxLgFod";

  useEffect(() => {
    // Función para cargar reCAPTCHA
    window.onRecaptchaLoad = function() {
      if (recaptchaRef.current && !recaptchaWidgetId.current) {
        try {
          recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
            'sitekey': sitekey,
            'callback': (response) => {
              setCaptchaVerified(!!response);
            },
            'expired-callback': () => {
              setCaptchaVerified(false);
            }
          });
        } catch (error) {
          console.error("reCAPTCHA error:", error);
        }
      }
    };

    // Cargar el script de reCAPTCHA si no está ya cargado
    const existingScript = document.querySelector('script[src*="recaptcha/api.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
        delete window.onRecaptchaLoad;
      };
    } else if (window.grecaptcha && window.grecaptcha.render) {
      window.onRecaptchaLoad();
    }
  }, [sitekey]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      setMessage({ text: "Por favor, verifica que no eres un robot", type: "error" });
      return;
    }

    try {
      const captchaResponse = window.grecaptcha ? window.grecaptcha.getResponse(recaptchaWidgetId.current) : '';
      
      const response = await fetch("http://localhost:5000/loginadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          'g-recaptcha-response': captchaResponse
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        setMessage({ text: data.error, type: "error" });
        if (window.grecaptcha) {
          window.grecaptcha.reset(recaptchaWidgetId.current);
          setCaptchaVerified(false);
        }
      } else {
        setMessage({ text: "Inicio de sesión exitoso!", type: "success" });
        
        // Guardar el token de autenticación en localStorage
        localStorage.setItem('adminToken', data.token);
        
        // Redirección usando react-router
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: "Error al conectar con el servidor", type: "error" });
      if (window.grecaptcha) {
        window.grecaptcha.reset(recaptchaWidgetId.current);
        setCaptchaVerified(false);
      }
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

        <div ref={recaptchaRef} className="g-recaptcha"></div>

        <button type="submit">Iniciar Sesión</button>
      </form>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
    </div>
  );
}

export default LogAd;