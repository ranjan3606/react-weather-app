import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import LeftSidebar from "./components/sidebar";
import MainWeather from "./components/main";
import { fetchWeatherData } from "./api/WeatherApi";
import {
  codeToBackground,
} from "./utilities/WeatherUtils";

function App() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [weekForecast, setWeekForecast] = useState([]);
  const [location, setLocation] = useState(null);
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState();
  const [alerts, setAlearts] = useState([]);
  const isOnline = navigator.onLine;

  useEffect(() => {
    const fetchData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const weatherData = await fetchWeatherData(latitude, longitude);

            const { location, current, forecast, alerts } = weatherData;

            document.title = "Atomic Weather - " + location + ", " + location;
            setLocation(location);
            setCurrent(current);
            setForecast(forecast);
            setAlearts(alerts?.alert);
            document.body.style.background = `url(${codeToBackground(
              current?.condition?.code
            )})`;
            document.body.style.backgroundSize = "110% 110%";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundAttachment = "fixed";
          },
          (error) => {
          }
        );
      } catch (error) {
      }
    };

    fetchData();

    if (!isOnline) {
      const data = JSON.parse(localStorage.getItem("weather-data"));
      setLocation(data.location);
      setCurrent(data.current);
      setForecast(data.forecast);

      document.body.style.background = `url(${codeToBackground(
        data.current.condition.code
      )})`;
      document.body.style.backgroundSize = "110% 110%";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";
    }
  }, [isOnline]);

  var pollutants = [
    "pm2_5",
    "pm10",
    "o3",
    "no2",
    "so2",
    "co",
    "us-epa-index",
    "gb-defra-index",
  ];
  var currentPollutant = "pm2_5";

  function roundNumber(number) {
    return Math.round(number);
  }

  function animateAirQuality() {
    if (document.getElementById("AQI-val")) {
      var indexofCurrentPollutant = pollutants.indexOf(currentPollutant);
      if (indexofCurrentPollutant === pollutants.length - 1) {
        document.getElementById("AQI-val").innerHTML = roundNumber(
          current.air_quality.pm2_5
        );
        document.getElementById("AQI-lab").innerHTML = "AQI - PM2.5";
        currentPollutant = pollutants[0];
      } else {
        document.getElementById("AQI-val").innerHTML = roundNumber(
          current.air_quality[pollutants[indexofCurrentPollutant + 1]]
        );
        document.getElementById("AQI-lab").innerHTML =
          "AQI - " + pollutants[indexofCurrentPollutant + 1].toUpperCase();
        currentPollutant = pollutants[indexofCurrentPollutant + 1];
      }
      setAirQuality(current?.air_quality[currentPollutant]);
    }

    setTimeout(() => {
      animateAirQuality();
    }, 5000);
  }

  useEffect(() => {
    setAirQuality(current?.air_quality[currentPollutant]);
    animateAirQuality();
    
    return () => clearTimeout(animateAirQuality);
  }, [current, currentPollutant]);

  const searchChangeHandler = async (enteredData) => {

    try {
      const [latitude, longitude] = enteredData?.value?.split(" ");
      const weatherData = await fetchWeatherData(latitude, longitude);
      const { current, forecast, location } = weatherData;
      setTodayWeather({ city: enteredData?.label, ...current });
      setWeekForecast({
        city: enteredData?.label,
        list: forecast?.forecastday,
      });
      setLocation(location);
      setCurrent(current);
      setForecast(forecast);
    } catch (error) {
    }

  };

  return (
    <Container className="main-wrapper mt-5">
      <Row>
        <Col md={3} style={{ borderRight: "1px solid #000" }}>
          <LeftSidebar
            data={todayWeather}
            current={current}
            onSearchChange={searchChangeHandler}
            location={location}
            forecast={forecast}
            airQuality={airQuality}
            alerts={alerts}
          />
        </Col>
        <Col md={9}>
          <MainWeather
            data={weekForecast}
            todayWeather={todayWeather}
            current={current}
            forecast={forecast}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
