// weatherUtils.js
const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

const WEATHER_API_URL = "https://api.weatherapi.com/v1/forecast.json?key=";
const WEATHER_API_KEY = "fe1b386df6c541aba8c105248212610";

const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
export const fetchWeatherData = async (latitude, longitude) => {
    const apiKey = WEATHER_API_KEY;
    const isOnline = navigator.onLine;
  
    let data;
  
    if (isOnline) {
      const url = `${WEATHER_API_URL}${apiKey}&q=${latitude},${longitude}&aqi=yes&days=5&alert=yes`;
  
      const response = await fetch(url);
      data = await response.json();
      document.title =
        "Atomic Weather - " + data.location.name + ", " + data.location.region;
      localStorage.setItem("weather-data", JSON.stringify(data));
    } else {
      data = JSON.parse(localStorage.getItem("weather-data"));
    }
  
    return data;
  };
  

export const setBackgroundStyles = (conditionCode) => {
  document.body.style.background = `url(${codeToBackground(conditionCode)})`;
  document.body.style.backgroundSize = "110% 110%";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";
};

export const codeToBackground = (code) => {
  switch (code) {
    case 1000:
      return "https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg"; 
    case 1003:
      return "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg"; 
    case 1006:
      return "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg";
    case 1009:
      return "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg"; 
    case 1030:
      return "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg"; 
    case 1063:
      return "https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    case 1066:
      return "https://images.pexels.com/photos/15326984/pexels-photo-15326984/free-photo-of-man-with-an-umbrella-walking-in-snow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; 
    case 1069:
      return "https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    case 1072:
      return "https://scx2.b-cdn.net/gfx/news/hires/2017/nasasolvesad.jpg"; 
    case 1087:
      return "https://images.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg"; 
    default:
      return "https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg";
  }
};

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}





export function calculateAirQualityPercentage(airQualityData) {
  // Check if airQualityData is defined
  if (!airQualityData) {
    return {
      airQualityStatus: "Data Missing",
      safePercentage: 0,
      dangerousPercentage: 0,
    };
  }

  // Assuming airQualityData is in the format: data?.air_quality
  const { co, no2, o3, so2, pm2_5, pm10 } = airQualityData;

  // Define threshold values for each pollutant
  const thresholds = {
    co: 700,   // Example threshold for CO
    no2: 40,   // Example threshold for NO2
    o3: 100,   // Example threshold for O3
    so2: 20,   // Example threshold for SO2
    pm2_5: 15, // Example threshold for PM2.5
    pm10: 50,  // Example threshold for PM10
  };

  // Calculate individual percentages
  const coPercentage = (co / thresholds.co) * 100;
  const no2Percentage = (no2 / thresholds.no2) * 100;
  const o3Percentage = (o3 / thresholds.o3) * 100;
  const so2Percentage = (so2 / thresholds.so2) * 100;
  const pm2_5Percentage = (pm2_5 / thresholds.pm2_5) * 100;
  const pm10Percentage = (pm10 / thresholds.pm10) * 100;

  // Calculate overall air quality percentage (average of individual percentages)
  const overallPercentage =
    (coPercentage + no2Percentage + o3Percentage + so2Percentage + pm2_5Percentage + pm10Percentage) / 6;

  // Define thresholds for categorizing overall air quality
  const safeThreshold = 50;
  const dangerousThreshold = 70;

  // Determine if overall air quality is safe, dangerous, or in between
  let airQualityStatus;
  if (overallPercentage <= safeThreshold) {
    airQualityStatus = "Safe";
  } else if (overallPercentage >= dangerousThreshold) {
    airQualityStatus = "Dangerous";
  } else {
    airQualityStatus = "In Between";
  }

  return {
    airQualityStatus,
    safePercentage: overallPercentage <= safeThreshold ? overallPercentage : 0,
    dangerousPercentage: overallPercentage >= dangerousThreshold ? overallPercentage : 0,
  };
}