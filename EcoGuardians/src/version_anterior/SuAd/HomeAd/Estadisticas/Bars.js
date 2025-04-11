import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StackedBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/BarsChart") // Endpoint de Flask
      .then((res) => res.json())
      .then((data) => {
        setChartData({
          labels: data.labels, // Países
          datasets: data.regions.map((region, index) => ({
            label: region,
            data: data.dataset[region],
            backgroundColor: `rgba(${(index * 50 + 100) % 255}, ${(index * 100 + 50) % 255}, ${(index * 150 + 200) % 255}, 0.6)`,
          })),
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
            text: "Total de Usuarios por País (Apilado por Región)",
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      }}
    />
  ) : (
    <p>Cargando...</p>
  );
};

export default StackedBarChart;
