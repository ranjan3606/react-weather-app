import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import moment from "moment";
import CustomTooltip from "./CustomTooltip";

const Home = ({ forecast }) => {
  const [hoveredLine, setHoveredLine] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Assuming forecast?.forecastday is an array with each element having an array of hours
    const result = forecast?.forecastday?.[0]?.hour?.map((hourData) => ({
      time: hourData?.time, // Assuming there is a 'time' property
      temp_c: hourData?.temp_c,
      humidity: hourData?.humidity,
      cloud: hourData?.cloud,
      chance_of_rain: hourData?.chance_of_rain,
      uv: hourData?.uv,
      vis_km: hourData?.vis_km,
    }));

    setData(result);
  }, [forecast]);

  // Formatter for the Legend
  const legendFormatter = (value) => {
    switch (value) {
      case "vis_km":
        return "Visibility (km)";
      case "chance_of_rain":
        return "Chance of Rain";
      case "uv":
        return "UV Index";
      case "temp_c":
        return "Temperature (°C)";
      case "humidity":
        return "Humidity";
      case "cloud":
        return "Cloud";
      default:
        return value;
    }
  };

  return (
    <div className="home">
      <div className="forecast">
        <motion.div
          className="box"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                          
              {/* Add more lines for other data points */}

              <Line
                type="monotone"
                dataKey="temp_c"
                stroke="#BF55EC"
                strokeWidth={hoveredLine === "temp_c" ? 7 : 2}
                dot={false}
                yAxisId={0}
                label={({ x, y, value }) => (
                  <text
                    x={x}
                    y={y}
                    dy={-4}
                    fill="red"
                    fontSize={10}
                    textAnchor="middle"
                  >
                    {value}
                  </text>
                )}
                onMouseEnter={() => setHoveredLine("temp_c")}
                onMouseLeave={() => setHoveredLine(null)}
                style={{ cursor: "pointer" }}
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="blue"
                strokeWidth={hoveredLine === "humidity" ? 7 : 2}
                dot={false}
                yAxisId={0}
                label={({ x, y, value }) => (
                  <text
                    x={x}
                    y={y}
                    dy={-4}
                    fill="blue"
                    fontSize={10}
                    textAnchor="middle"
                  >
                    {value}
                  </text>
                )}
                onMouseEnter={() => setHoveredLine("humidity")}
                onMouseLeave={() => setHoveredLine(null)}
                style={{ cursor: "pointer" }}
              />
              <Line
                type="monotone"
                dataKey="cloud"
                stroke="black"
                strokeWidth={hoveredLine === "cloud" ? 7 : 2}
                dot={false}
                yAxisId={0}
                label={({ x, y, value }) => (
                  <text
                    x={x}
                    y={y}
                    dy={-4}
                    fill="black"
                    fontSize={10}
                    textAnchor="middle"
                  >
                    {value}
                  </text>
                )}
                onMouseEnter={() => setHoveredLine("cloud")}
                onMouseLeave={() => setHoveredLine(null)}
                style={{ cursor: "pointer" }}
              />
              <Line
                type="monotone"
                dataKey="chance_of_rain"
                stroke="lightblue"
                strokeWidth={hoveredLine === "chance_of_rain" ? 7 : 2}
                dot={false}
                yAxisId={0}
                label={({ x, y, value }) => (
                  <text
                    x={x}
                    y={y}
                    dy={-4}
                    fill="lightblue"
                    fontSize={10}
                    textAnchor="middle"
                  >
                    {value}
                  </text>
                )}
                onMouseEnter={() => setHoveredLine("chance_of_rain")}
                onMouseLeave={() => setHoveredLine(null)}
                style={{ cursor: "pointer" }}
              />
              <Line
                type="monotone"
                dataKey="uv"
                stroke="#ffc658"
                strokeWidth={hoveredLine === "uv" ? 7 : 2}
                dot={false}
                yAxisId={1}
                label={({ x, y, value }) => (
                  <text
                    x={x}
                    y={y}
                    dy={-4}
                    fill="#ffc658"
                    fontSize={10}
                    textAnchor="middle"
                  >
                    {value}
                  </text>
                )}
                onMouseEnter={() => setHoveredLine("uv")}
                onMouseLeave={() => setHoveredLine(null)}
                style={{ cursor: "pointer" }}
              />
              <Line
                type="monotone"
                dataKey="vis_km"
                stroke="lightgreen"
                strokeWidth={hoveredLine === "vis_km" ? 7 : 2}
                dot={false}
                yAxisId={2}
                label={({ x, y, value }) => (
                  <text
                    x={x}
                    y={y}
                    dy={-4}
                    fill="lightgreen"
                    fontSize={10}
                    textAnchor="middle"
                  >
                    {value}
                  </text>
                )}
                onMouseEnter={() => setHoveredLine("vis_km")}
                onMouseLeave={() => setHoveredLine(null)}
                style={{ cursor: "pointer" }}
              />
              <Tooltip
                content={
                  <CustomTooltip
                    hoveredLine={hoveredLine}
                    data={forecast?.forecastday[0]?.hour}
                  />
                }
              />
              <XAxis
                dataKey="time"
                tickFormatter={(timeStr) =>
                  moment(timeStr, "YYYY-MM-DD HH:mm").format("hA")
                }
                interval={2}
              />
              <YAxis
                yAxisId={2}
                orientation="right"
                width={30}
                stroke="lightgreen"
              />
              <YAxis
                yAxisId={1}
                orientation="right"
                width={30}
                stroke="#ffc658"
              />
              <YAxis
                yAxisId={0}
                orientation="right"
                width={40}
                stroke="lightblue"
              />
              <Legend formatter={legendFormatter} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
