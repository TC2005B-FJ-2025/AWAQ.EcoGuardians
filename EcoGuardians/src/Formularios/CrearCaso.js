import { useState } from "react";
import React from "react";
import EncabezadoCrearCaso from "../InHome/encabezadoCrearCaso"; 

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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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

    const colorVerde = "#2F5621";

    return React.createElement(
        "div",
        { className: "min-h-screen bg-gray-50" },

        // Nuevo encabezado importado
        React.createElement(EncabezadoCrearCaso, null),

        // Formulario
        React.createElement(
            "div",
            { className: "flex justify-center p-6" },
            React.createElement(
                "form",
                {
                    onSubmit: handleSubmit,
                    className: "w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md border",
                    style: { borderColor: colorVerde }
                },

                React.createElement("h2", { className: "text-xl font-bold mb-4 text-center text-green-800" }, "Quejas y Sugerencias"),

                createField("Asunto", "subject", "text", formData.subject, handleChange, colorVerde),
                createTextArea("Descripción", "description", formData.description, handleChange, colorVerde),
                createSelect("Prioridad", "priority", formData.priority, handleChange, colorVerde, [
                    { value: "Low", label: "Baja" },
                    { value: "Medium", label: "Media" },
                    { value: "High", label: "Alta" }
                ]),
                createField("Nombre de Usuario", "nombre_usuario", "text", formData.nombre_usuario, handleChange, colorVerde),
                createField("Correo Electrónico", "supplied_email", "email", formData.supplied_email, handleChange, colorVerde),
                createSelect("Tipo de Opinión", "tipo_opinion", formData.tipo_opinion, handleChange, colorVerde, [
                    { value: "Queja", label: "Queja" },
                    { value: "Sugerencia", label: "Sugerencia" },
                    { value: "Otro", label: "Otro" }
                ]),
                createTextArea("Opiniones o Sugerencias", "opiniones_sugerencias", formData.opiniones_sugerencias, handleChange, colorVerde),

                React.createElement(
                    "button",
                    {
                        type: "submit",
                        className: "mt-4 w-full text-white font-semibold py-2 rounded-xl transition hover:brightness-110",
                        style: { backgroundColor: colorVerde }
                    },
                    "Enviar"
                )
            )
        )
    );
}

// Helpers
function createField(label, name, type, value, onChange, borderColor) {
    return React.createElement(React.Fragment, null,
        React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1 mt-4" }, label),
        React.createElement("input", {
            type,
            name,
            value,
            onChange,
            className: "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400",
            required: true,
            style: { borderColor }
        })
    );
}

function createTextArea(label, name, value, onChange, borderColor) {
    return React.createElement(React.Fragment, null,
        React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1 mt-4" }, label),
        React.createElement("textarea", {
            name,
            value,
            onChange,
            rows: 4,
            className: "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400",
            style: { borderColor }
        })
    );
}

function createSelect(label, name, value, onChange, borderColor, options) {
    return React.createElement(React.Fragment, null,
        React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1 mt-4" }, label),
        React.createElement("select", {
            name,
            value,
            onChange,
            className: "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400",
            style: { borderColor }
        },
            options.map(opt =>
                React.createElement("option", { key: opt.value, value: opt.value }, opt.label)
            )
        )
    );
}

export default CrearCaso;