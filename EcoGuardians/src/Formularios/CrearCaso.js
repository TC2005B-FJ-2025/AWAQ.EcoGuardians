import { useState } from "react";
import React from "react";
import EncabezadoCrearCaso from "../InHome/encabezadoCrearCaso";
import { useTranslation } from "react-i18next";

function CrearCaso() {
    const { t } = useTranslation();
    
    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        priority: 'Low',
        nombre_usuario: '',
        supplied_email: '',
        tipo_opinion: 'Queja',
        opiniones_sugerencias: ''
    });

    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.tipo_opinion || !formData.supplied_email || !formData.opiniones_sugerencias) {
            setMensaje({ texto: t("crearCaso.alert_campos"), tipo: "error" });
            limpiarMensaje();
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/crear-caso", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            //const data = await response.json();

            if (response.ok) {
                setMensaje({ texto: t("crearCaso.success"), tipo: "exito" });
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
                setMensaje({ texto: t("crearCaso.error_general"), tipo: "error" });
            }
        } catch (error) {
            setMensaje({ texto: t("crearCaso.error_crear") + error.message, tipo: "error" });
        }

        limpiarMensaje();
    };

    const limpiarMensaje = () => {
        setTimeout(() => {
            setMensaje({ texto: '', tipo: '' });
        }, 4000);
    };

    const colorVerde = "#2F5621";

    return React.createElement(
        "div",
        { className: "min-h-screen bg-gray-50 pt-[120px] sm:pt-[100px]" },

        // Encabezado
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
                    style: { borderColor: colorVerde },
                    "aria-label": t("crearCaso.titulo")
                },

                React.createElement("h2", { className: "text-xl font-bold mb-4 text-center text-green-800" },  t("crearCaso.titulo")),

                createSelect(t("crearCaso.label_tipo"), "tipo_opinion", formData.tipo_opinion, handleChange, colorVerde, [
                    { value: "Queja", label: t("crearCaso.queja") },
                    { value: "Sugerencia", label: t("crearCaso.sugerencia") },
                    { value: "Otro", label: t("crearCaso.otro") }
                ]),

                createTextArea(t("crearCaso.label_opiniones"), "opiniones_sugerencias", formData.opiniones_sugerencias, handleChange, colorVerde),

                createFieldWithNote(t("crearCaso.label_email"), "supplied_email", "email", formData.supplied_email, handleChange, colorVerde,t),

                // Mensaje bonito de éxito o error
                mensaje.texto && React.createElement(
                    "div",
                    {
                        className: `mt-4 p-3 rounded text-sm text-center font-medium ${
                            mensaje.tipo === "error"
                                ? "bg-red-100 text-red-700 border border-red-300"
                                : "bg-green-100 text-green-700 border border-green-300"
                        }`,
                        "aria-live": "polite"
                    },
                    mensaje.texto
                ),

                // Botón enviar
                React.createElement(
                    "button",
                    {
                        type: "submit",
                        className: "mt-4 w-full text-white font-semibold py-2 rounded-xl transition hover:brightness-110",
                        style: { backgroundColor: colorVerde }
                    },
                    t("crearCaso.boton_enviar")
                )
            )
        )
    );
}

/*Helpers
function createField(label, name, type, value, onChange, borderColor) {
    return React.createElement(React.Fragment, null,
        React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1 mt-4" }, label),
        React.createElement("input", {
            type,
            name,
            value,
            onChange,
            className: "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-800",
            required: true,
            style: { borderColor }
        })
    );
}*/

function createFieldWithNote(label, name, type, value, onChange, borderColor,t) {
    return React.createElement(React.Fragment, null,
        React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1 mt-4" }, label),
        React.createElement("input", {
            type,
            name,
            value,
            onChange,
            className: "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-800",
            required: true,
            style: { borderColor }
        }),
        React.createElement("p", { className: "text-xs text-gray-700 mt-1" }, t("crearCaso.campo_obligatorio"))
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
            className: "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-800",
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
            className: "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-800",
            style: { borderColor }
        },
            options.map(opt =>
                React.createElement("option", { key: opt.value, value: opt.value }, opt.label)
            )
        )
    );
}

export default CrearCaso;
