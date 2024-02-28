import React from "react";
import CityWeatherComponent from "./CityWeatherComponent";
import CityChartWeather from "../chart/CityChartWeather";

function RightSideWeather({
  todayWeather,
  current,
  forecast,
}) {
  return (
    <div className="mt-5 text-white">
      <h5>Weather Forecast</h5>
      <div className="weather_details text-white">
        <h1>
          {todayWeather?.condition?.text
            ? todayWeather?.condition?.text
            : current?.condition?.text}{" "}
        </h1>
      </div>

      <div className="country_weather d-flex align-items-center mt-4">
        <img
          src={
            todayWeather?.condition?.icon
              ? todayWeather?.condition?.icon
              : current?.condition?.icon
          }
          alt=""
          className="me-1"
          style={{ width: "50px" }}
        />
        <p className="mt-1">
          {new Date(
            todayWeather?.last_updated
              ? todayWeather?.last_updated
              : current?.last_updated
          )?.toLocaleString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>{" "}
      </div>
      <div style={{ width: "35%" }} className="mt-2">
        <p className="mt-50">
          Variables{" "}
          {todayWeather?.condition?.text
            ? todayWeather?.condition?.text
            : current?.condition?.text}{" "}
          and {todayWeather?.temp_f ? todayWeather?.temp_f : current?.temp_f}F.
          Winds{" "}
          <b>
            {todayWeather?.wind_mph
              ? todayWeather?.wind_mph
              : current?.wind_mph}
          </b>{" "}
          E at{" "}
          {todayWeather?.wind_kph ? todayWeather?.wind_kph : current?.wind_kph}
          kph.
        </p>
      </div>
      <CityChartWeather
        current={current}
        forecast={forecast }
      />
      <div className="mb-2">
      <CityWeatherComponent data={forecast} />
      </div>
    </div>
  );
}

export default RightSideWeather;
