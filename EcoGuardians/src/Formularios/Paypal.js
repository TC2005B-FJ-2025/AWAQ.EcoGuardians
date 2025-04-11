import { useState, useEffect } from "react";

function Paypal() {
    const [amount, setAmount] = useState("");
    const [customAmount, setCustomAmount] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = urlParams.get('paymentId');
        const payerId = urlParams.get('PayerID');
        const emailFromUrl = urlParams.get('email');

        if (paymentId && payerId) {
            // Usar el email de la URL si está disponible
            const finalEmail = emailFromUrl || email;
            
            if (!validateEmail(finalEmail)) {
                setPaymentStatus({
                    success: false,
                    message: "Por favor ingresa un email válido antes de continuar"
                });
                return;
            }

            // Si el email de la URL es diferente al estado actual, actualizarlo
            if (emailFromUrl && emailFromUrl !== email) {
                setEmail(emailFromUrl);
            }

            executePayment(paymentId, payerId, finalEmail);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const executePayment = async (paymentId, payerId, emailToUse) => {
        setIsProcessing(true);
        try {
            const response = await fetch("http://localhost:5000/execute-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    paymentID: paymentId,
                    PayerID: payerId,
                    email: emailToUse
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al ejecutar el pago");
            }

            setPaymentStatus({
                success: true,
                message: data.message || "¡Donación completada con éxito!",
                amount: data.amount || (customAmount || amount),
                emailSent: data.email_sent
            });
            
        } catch (error) {
            setPaymentStatus({
                success: false,
                message: error.message || "Error al ejecutar el pago"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDonate = async () => {
        setIsProcessing(true);
        const donationAmount = customAmount || amount;
        
        if (!donationAmount || parseFloat(donationAmount) <= 0) {
            alert("Por favor ingresa una cantidad válida para la donación");
            setIsProcessing(false);
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Por favor ingresa un email válido");
            setIsProcessing(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    donation_amount: parseFloat(donationAmount).toFixed(2),
                    email: email
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error en la respuesta del servidor");
            }

            if (data.approval_url) {
                window.location.href = data.approval_url;
            } else {
                throw new Error("Datos de pago incompletos");
            }
        } catch (error) {
            alert("Error al procesar el pago: " + error.message);
            setIsProcessing(false);
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value && !validateEmail(value)) {
            setEmailError("Email inválido");
        } else {
            setEmailError("");
        }
    };

    const handleRetry = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = urlParams.get('paymentId');
        const payerId = urlParams.get('PayerID');
        
        if (paymentId && payerId && validateEmail(email)) {
            executePayment(paymentId, payerId, email);
        }
    };

    if (isProcessing && !paymentStatus) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="border-2 border-[#556B2F] rounded-2xl p-10 max-w-4xl shadow-2xl bg-white text-center">
                    <h2 className="text-[#556B2F] text-2xl font-semibold">Procesando tu pago...</h2>
                    <p className="text-gray-600 mt-4">Por favor espera mientras completamos la transacción.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {paymentStatus ? (
                <div className="border-2 border-[#556B2F] rounded-2xl p-10 max-w-4xl shadow-2xl bg-white text-center">
                    <div className={`p-6 rounded-lg ${
                        paymentStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                        <h2 className="text-xl font-bold mb-2">{paymentStatus.message}</h2>
                        {paymentStatus.amount && (
                            <p className="text-lg">Monto donado: <span className="font-bold">${paymentStatus.amount}</span></p>
                        )}
                        {paymentStatus.emailSent === false && paymentStatus.success && (
                            <p className="text-yellow-700 mt-2">No se pudo enviar el correo de confirmación</p>
                        )}
                        
                        {!paymentStatus.success && validateEmail(email) && (
                            <button 
                                onClick={handleRetry}
                                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg text-md font-semibold hover:bg-blue-600 transition duration-300"
                            >
                                Reintentar con el email actual
                            </button>
                        )}
                        
                        <button
                            onClick={() => {
                                setPaymentStatus(null);
                                setAmount("");
                                setCustomAmount("");
                            }}
                            className="mt-6 bg-[#556B2F] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#6A7B3F] transition duration-300 shadow-md"
                        >
                            Hacer otra donación
                        </button>
                    </div>
                </div>
            ) : (
                <div className="border-2 border-[#556B2F] rounded-2xl p-10 max-w-4xl shadow-2xl bg-white flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-6">
                        <h2 className="text-[#556B2F] text-lg font-semibold uppercase">Donaciones</h2>
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">¿Quieres colaborar?</h1>
                        <p className="text-gray-600 text-md">
                            Tu apoyo nos ayuda a continuar con nuestra labor. Por favor ingresa tus datos para procesar la donación.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-[#556B2F]">
                        <p className="text-gray-600 text-lg mb-3">Elige una cantidad</p>
                        <div className="flex gap-4 mb-4 flex-wrap">
                            {[50, 100, 200].map((value) => (
                                <button 
                                    key={value}
                                    onClick={() => {
                                        setAmount(value);
                                        setCustomAmount("");
                                    }}
                                    className={`border rounded-lg px-5 py-3 font-semibold transition duration-200 ${
                                        amount === value && !customAmount 
                                            ? "bg-[#556B2F] text-white" 
                                            : "text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    ${value}
                                </button>
                            ))}
                        </div>
                        <p className="text-gray-600 text-md mb-3">o también puedes</p>
                        <input
                            type="number"
                            className="border rounded-lg px-4 py-3 w-full text-lg text-center mb-4 shadow-sm focus:ring-2 focus:ring-[#556B2F]"
                            placeholder="Ingresa el monto"
                            value={customAmount}
                            onChange={(e) => {
                                setCustomAmount(e.target.value);
                                if (e.target.value) setAmount("");
                            }}
                            disabled={isProcessing}
                        />
                        
                        <div className="mb-4">
                            <input
                                type="email"
                                className={`border rounded-lg px-4 py-3 w-full text-lg shadow-sm focus:ring-2 focus:ring-[#556B2F] ${
                                    emailError ? "border-red-500" : ""
                                }`}
                                placeholder="Tu correo electrónico"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            {emailError && (
                                <p className="text-red-500 text-sm mt-1">{emailError}</p>
                            )}
                        </div>
                        
                        <button
                            onClick={handleDonate}
                            disabled={isProcessing || !email || emailError}
                            className={`bg-[#556B2F] text-white px-8 py-3 rounded-lg w-full text-lg font-semibold hover:bg-[#6A7B3F] transition duration-300 shadow-md ${
                                isProcessing || !email || emailError ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        >
                            {isProcessing ? "Procesando..." : "Donar con PayPal"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Paypal;