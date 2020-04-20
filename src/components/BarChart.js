import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const BarChart = ({ BarData }) => {
   return (
      <div>
         <HorizontalBar data={BarData} options={{ responsive: true }} />
      </div>
   );
};

export default BarChart;
