import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnimacionFadeUp from "../InHome/AnimacionFadeUp";

function Paypal() {
    const [amount, setAmount] = useState("");
    const [customAmount, setCustomAmount] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const location = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const processTextWithLineBreaks = (text) => {
        return text.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ));
      };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = urlParams.get('paymentId');
        const payerId = urlParams.get('PayerID');
        const emailFromUrl = urlParams.get('email');

        if (location.pathname === "/cancel-payment") {
            fetch("http://localhost:5000/cancel-payment")
                .then((res) => res.json())
                .then((data) => {
                    console.log(t("donaciones.backend_answer"), data);
                })
                .catch((err) => {
                    console.error(t("backend_err"), err);
                });

            setPaymentStatus({
                success: false,
                message: t("donaciones.payment_cancel"),
            });
            return;
        }

        if (paymentId && payerId) {
            const finalEmail = emailFromUrl || email;

            if (!validateEmail(finalEmail)) {
                setPaymentStatus({
                    success: false,
                    message: t("donaciones.error_email_url")
                });
                return;
            }

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
                throw new Error(data.error || t("donaciones.error_ejecucion"));
            }

            setPaymentStatus({
                success: true,
                message: t("donaciones.completado"),
                amount: data.amount || (customAmount || amount),
                emailSent: data.email_sent
            });

        } catch (error) {
            setPaymentStatus({
                success: false,
                message: error.message || t("donaciones.error_ejecucion")
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDonate = async () => {
        setIsProcessing(true);
        const donationAmount = customAmount || amount;

        if (!donationAmount || parseFloat(donationAmount) <= 0) {
            alert(t("donaciones.error_monto_invalido"));
            setIsProcessing(false);
            return;
        }

        if (!validateEmail(email)) {
            setEmailError(t("donaciones.error_email"));
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
                throw new Error(data.error || t("donaciones.error_respuesta"));
            }

            if (data.approval_url) {
                window.location.href = data.approval_url;
            } else {
                throw new Error(t("donaciones.datos_incompletos"));
            }
        } catch (error) {
            alert(t("donaciones.error_pago") + error.message);
            setIsProcessing(false);
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value && !validateEmail(value)) {
            setEmailError(t("donaciones.error_email"));
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
            <div className="flex justify-center items-center min-h-screen bg-white">
                <div className="rounded-3xl p-10 max-w-3xl shadow-xl bg-white text-center">
                    <h2 className="text-[#556B2F] text-2xl font-semibold">{t("donaciones.procesando")}</h2>
                    <p className="text-gray-600 mt-4">{t("donaciones.espera")}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white px-4">
            {paymentStatus ? (
                <AnimacionFadeUp>
                    
                    <div className="rounded-3xl p-10 max-w-3xl shadow-xl bg-white text-center border border-[#D1E0C2]">
                        <div className={`p-6 rounded-xl ${paymentStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            <h2 className="text-xl font-bold mb-2">{paymentStatus.message}</h2>
                            {paymentStatus.amount && (
                                <p className="text-lg">{t("donaciones.monto")} <span className="font-bold">${paymentStatus.amount}</span></p>
                            )}
                            {paymentStatus.emailSent === false && paymentStatus.success && (
                                <p className="text-yellow-700 mt-2">{t("donaciones.no_email")}</p>
                            )}
                            {!paymentStatus.success && validateEmail(email) && (
                                <button
                                    onClick={handleRetry}
                                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-xl text-md font-semibold hover:bg-blue-600 transition duration-300"
                                >
                                    {t("donaciones.reintentar")}
                                </button>
                            )}
                            <div className="flex flex-col items-center space-y-4 mt-6">
                                <button
                                    onClick={() => {
                                        setPaymentStatus(null);
                                        setAmount("");
                                        setCustomAmount("");
                                    }}
                                    className="bg-[#556B2F] text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-[#6A7B3F] transition duration-300 shadow-md"
                                >
                                    {t("donaciones.otra_donacion")}
                                </button>
                                <button
                                    onClick={() => navigate("/")}
                                    className="bg-[#556B2F] text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-[#6A7B3F] transition duration-300 shadow-md"
                                >
                                    {t("donaciones.ir_inicio")}
                                </button>
                            </div>
                        </div>
                    </div>
                </AnimacionFadeUp>
            ) : (
                <AnimacionFadeUp>
                    
                    <div className="rounded-3xl p-10 max-w-4xl w-full shadow-xl bg-white flex flex-col md:flex-row border border-[#D1E0C2]">
                        <div className="w-full md:w-1/2 p-6">
                            <h2 className="text-[#556B2F] text-sm font-semibold uppercase mb-2">{t("donaciones.titulo")}</h2>
                            <h1 className="text-3xl font-bold mb-4 text-[#3A3A3A]">{t("donaciones.subtitulo")}</h1>
                            <p className="text-gray-600 text-md, text-justify">
                            {processTextWithLineBreaks(t("donaciones.descripcion"))}
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-[#D1E0C2]">
                            <p className="text-[#3A3A3A] text-md mb-3 font-medium">{t("donaciones.elegir_monto")}</p>
                            <div className="flex gap-4 mb-4 flex-wrap">
                                {[50, 100, 200].map((value) => (
                                    <button
                                        key={value}
                                        onClick={() => {
                                            setAmount(value);
                                            setCustomAmount(value.toString());
                                        }}
                                        className={`border rounded-xl px-5 py-3 font-semibold transition duration-200 ${
                                            amount === value && !customAmount
                                                ? "bg-[#556B2F] text-white"
                                                : "text-[#3A3A3A] border-[#D1E0C2] hover:bg-[#F0F4EB]"
                                        }`}
                                    >
                                        ${value}
                                    </button>
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{t("donaciones.o_ingresa")}</p>
                            <input
                                type="number"
                                className="border rounded-xl px-4 py-3 w-full text-lg text-center mb-4 shadow-sm focus:ring-2 focus:ring-[#556B2F]"
                                placeholder={t("donaciones.placeholder_monto")}
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
                                    className={`border rounded-xl px-4 py-3 w-full text-lg shadow-sm focus:ring-2 focus:ring-[#556B2F] ${
                                        emailError ? "border-red-500" : ""
                                    }`}
                                    placeholder={t("donaciones.placeholder_email")}
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
                                className={`bg-[#556B2F] text-white px-8 py-3 rounded-xl w-full text-lg font-semibold hover:bg-[#6A7B3F] transition duration-300 shadow-md ${
                                    isProcessing || !email || emailError ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                            >
                                {isProcessing ? t("donaciones.procesando_btn") : t("donaciones.boton_donar")}
                            </button>
                        </div>
                    </div>
                </AnimacionFadeUp>
            )}
        </div>
    );
}

export default Paypal;