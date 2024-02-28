import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Tooltip,
} from "recharts";

const LineChart = ({ forecast }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const result = forecast?.forecastday?.map((lineChart) => {
      return {
        time: lineChart.date,
        humidity: lineChart.day.avghumidity,
      };
    });

    setData(result);
  }, [forecast]);

  return (
    <div className="widget droite" style={{ width: "100%", height: 100 }}>
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={100}
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Tooltip
            formatter={(value) => [`Humidity (${value})`]}
          />
          <Line type="monotone" dataKey="humidity" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
