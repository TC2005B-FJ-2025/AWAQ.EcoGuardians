import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const UserRegis = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/UserRegis") // Endpoint Flask
      .then((res) => res.json())
      .then((data) => {
        setChartData({
          labels: data.meses.map((mes) => `Mes ${mes}`), // Crear las etiquetas de los meses
          datasets: [
            {
              label: "Total de Registros",
              data: data.total_registros,
              backgroundColor: "rgba(153, 102, 255, 0.6)",
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
            text: "Registro de Usuarios por Mes",
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
              text: "Total de Registros",
            },
          },
        },
      }}
    />
  ) : (
    <p>Cargando...</p>
  );
};

export default UserRegis;
