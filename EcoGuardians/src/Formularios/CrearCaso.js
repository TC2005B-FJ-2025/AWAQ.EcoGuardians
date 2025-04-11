import { useState } from "react";

function CrearCaso() {
    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        priority: 'Low',
        nombre_usuario: '',
        supplied_email: '',
        tipo_opinion: 'Queja',
        opiniones_sugerencias: ''
    });

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
        if (!formData.subject || !formData.description || !formData.nombre_usuario || !formData.supplied_email) {
            alert("Por favor completa todos los campos requeridos");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/crear-caso", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Caso creado con éxito");
                // Limpiar el formulario después de enviar
                setFormData({
                    subject: '',
                    description: '',
                    priority: 'Low',
                    nombre_usuario: '',
                    supplied_email: '',
                    tipo_opinion: 'Queja',
                    opiniones_sugerencias: ''
                });
            } else {
                alert("Hubo un problema al crear el caso. Intenta nuevamente.");
            }
        } catch (error) {
            alert("Error al crear el caso: " + error.message);
        }
    };

    return (
        <div>
            <h1>Crear Nuevo Caso</h1>
            <p>Por favor completa el formulario para crear un nuevo caso:</p>

            <form id="caso-form" onSubmit={handleSubmit}>
                <label htmlFor="subject">Asunto:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Ingrese el asunto"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                />

                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Ingrese la descripción"
                    required
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>

                <label htmlFor="priority">Prioridad:</label>
                <select
                    id="priority"
                    name="priority"
                    required
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="Low">Baja</option>
                    <option value="Medium">Media</option>
                    <option value="High">Alta</option>
                </select>

                <label htmlFor="nombre_usuario">Nombre de Usuario:</label>
                <input
                    type="text"
                    id="nombre_usuario"
                    name="nombre_usuario"
                    placeholder="Ingrese su nombre"
                    required
                    value={formData.nombre_usuario}
                    onChange={handleChange}
                />

                <label htmlFor="supplied_email">Correo Electrónico:</label>
                <input
                    type="email"
                    id="supplied_email"
                    name="supplied_email"
                    placeholder="Ingrese su correo electrónico"
                    required
                    value={formData.supplied_email}
                    onChange={handleChange}
                />

                <label htmlFor="tipo_opinion">Tipo de Opinión:</label>
                <select
                    id="tipo_opinion"
                    name="tipo_opinion"
                    required
                    value={formData.tipo_opinion}
                    onChange={handleChange}
                >
                    <option value="Queja">Queja</option>
                    <option value="Sugerencia">Sugerencia</option>
                    <option value="Otro">Otro</option>
                </select>

                <label htmlFor="opiniones_sugerencias">Opiniones o Sugerencias:</label>
                <textarea
                    id="opiniones_sugerencias"
                    name="opiniones_sugerencias"
                    placeholder="Ingrese sus opiniones o sugerencias"
                    value={formData.opiniones_sugerencias}
                    onChange={handleChange}
                ></textarea>

                <button type="submit">Crear Caso</button>
            </form>
        </div>
    );
}

export default CrearCaso;