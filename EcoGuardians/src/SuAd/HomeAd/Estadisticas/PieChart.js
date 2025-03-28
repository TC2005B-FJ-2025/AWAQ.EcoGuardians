import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const GameCompletionChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/game-completion") // Llamar a Flask
      .then((res) => res.json())
      .then((data) => {
        setChartData({
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: ["#36A2EB", "#FF6384"],
            },
          ],
        });
      });
  }, []);

  return chartData ? <Pie data={chartData} /> : <p>Cargando...</p>;
};

export default GameCompletionChart;
