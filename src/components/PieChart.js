import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ PieData }) => {
   return (
      <div>
         <Pie data={PieData} options={{ responsive: true }} />
      </div>
   );
};

export default PieChart;
