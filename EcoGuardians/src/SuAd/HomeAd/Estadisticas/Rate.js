import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const AverageRating = () => {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/AverageRating") // Endpoint Flask
      .then((res) => res.json())
      .then((data) => {
        setRating(data.average_rating);
      });
  }, []);

  return rating !== null ? (
    <div
      style={{
        width: "400px", // Tamaño ajustado para que la dona se vea correctamente
        height: "400px", // Tamaño ajustado
        position: "relative",
        margin: "0 auto",
      }}
    >
      <Doughnut
        data={{
          labels: ["Satisfacción", "Resto"], // Parte visible del medidor
          datasets: [
            {
              label: "Satisfacción Promedio",
              data: [rating, 5 - rating], // La parte del medidor, de 0 a 5
              backgroundColor: [
                "rgba(75, 192, 192, 1)", // Color de la parte llena (satisfacción)
                "rgba(200, 200, 200, 0.5)", // Color de la parte vacía (resto)
              ],
              borderWidth: 0,
            },
          ],
        }}
        options={{
          responsive: true,
          circumference: Math.PI, // Semi círculo
          rotation: Math.PI, // Empezamos desde el lado izquierdo
          cutout: "80%", // Ajuste del agujero para un mejor tamaño
          plugins: {
            tooltip: {
              enabled: false, // Deshabilitamos el tooltip por estética
            },
            legend: {
              display: false, // Sin leyenda
            },
          },
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%", // Centrado verticalmente
          left: "50%",
          transform: "translate(-50%, -50%)", // Centrado total
          fontSize: "2rem", // Ajustamos el tamaño del texto
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {rating}
      </div>
    </div>
  ) : (
    <p>Cargando...</p>
  );
};



export default AverageRating;
