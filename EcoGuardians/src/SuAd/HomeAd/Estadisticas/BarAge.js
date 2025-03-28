import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AgeBar = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/BarAge") // Endpoint Flask
      .then((res) => res.json())
      .then((data) => {
        setChartData({
          labels: data.grupos_edad, // Los grupos de edad
          datasets: [
            {
              label: "Total de Usuarios",
              data: data.total_usuarios, // Los totales de usuarios por grupo de edad
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });
      });
  }, []);

  return chartData ? (
    <div style={{ height: "500px" }}>
      <Bar
        data={chartData}
        options={{
          indexAxis: 'y', // Para hacer el gráfico de barras horizontal
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Usuarios por Grupo de Edad",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Total de Usuarios",
              },
            },
            y: {
              title: {
                display: true,
                text: "Grupo de Edad",
              },
            },
          },
        }}
      />
    </div>
  ) : (
    <p>Cargando...</p>
  );
};

export default AgeBar;
