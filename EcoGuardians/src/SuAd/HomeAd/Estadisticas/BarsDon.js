import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarDonation = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/totDonation") // Llamada al backend Flask
      .then((res) => res.json())
      .then((data) => {
        setChartData({
          labels: data.meses.map((mes) => `Mes ${mes}`), // Crear las etiquetas de los meses
          datasets: [
            {
              label: "Total de Donativos",
              data: data.total_donaciones,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });
      });
  }, []);

  return chartData ? (
    <Bar
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Total de Donativos por Mes",
          },
        },
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Meses",
            },
          },
          y: {
            title: {
              display: true,
              text: "Total de Donativos",
            },
          },
        },
      }}
    />
  ) : (
    <p>Cargando...</p>
  );
};

export default BarDonation;
