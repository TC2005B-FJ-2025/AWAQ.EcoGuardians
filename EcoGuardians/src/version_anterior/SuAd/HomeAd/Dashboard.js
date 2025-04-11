import React from "react";
import BarDonation from "./Estadisticas/BarsDon";
import StackedBarChart from "./Estadisticas/Bars";
import UserRegis from "./Estadisticas/BarsRegis";
import GameCompletionChart from "./Estadisticas/PieChart";
import AgeBar from "./Estadisticas/BarAge";
import AverageRating from "./Estadisticas/Rate";

function Dashboard() {
    return (
      <div>
        <BarDonation />
        <StackedBarChart />
        <GameCompletionChart />
        <UserRegis />
        <AgeBar />
        <AverageRating />
      </div>
    );
  }
  
  export default Dashboard;