import { useState, useEffect } from "react";

function Paypal() {
    const [donationAmount, setDonationAmount] = useState("");

    useEffect(() => {
        // Cargar el script de PayPal dinámicamente
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=TU_CLIENT_ID";
        script.async = true;
        script.onload = () => console.log("PayPal script cargado correctamente");
        document.body.appendChild(script);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!donationAmount || donationAmount <= 0) {
            alert("Por favor ingresa una cantidad válida para la donación");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ donation_amount: donationAmount }),
            });

            const data = await response.json();

            if (data.paymentID && data.approval_url) {
                window.location.href = data.approval_url; // Redirige al usuario a PayPal para aprobar el pago
            } else {
                alert("Hubo un problema al crear el pago. Intenta nuevamente.");
            }
        } catch (error) {
            alert("Error al crear el pago: " + error.message);
        }
    };

    return (
        <div>
            <h1>Donar</h1>
            <p>Por favor ingresa la cantidad que deseas donar:</p>

            <form id="donation-form" onSubmit={handleSubmit}>
                <label htmlFor="donation_amount">Monto de la donación (USD):</label>
                <input
                    type="number"
                    id="donation_amount"
                    name="donation_amount"
                    placeholder="Ingrese cantidad en USD"
                    required
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                />
                <button type="submit">Donar</button>
            </form>
        </div>
    );
}

export default Paypal;
