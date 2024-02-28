const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
// const WEATHER_API_KEY = '18f47bb0e08de69a1dc9e25d63e89f03';

// export async function fetchWeatherData(lat, lon) {
//   try {
//     let [weatherPromise, forcastPromise] = await Promise.all([
//       fetch(
//         `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
//       ),
//       fetch(
//         `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
//       ),
//     ]);

//     const weatherResponse = await weatherPromise.json();
//     const forcastResponse = await forcastPromise.json();
//     return [weatherResponse, forcastResponse];
//   } catch (error) {
//     console.log(error);
//   }
// }

const WEATHER_API_URL = "https://api.weatherapi.com/v1/forecast.json";
const WEATHER_API_KEY = "3d3daeeb4818470c8e9105910242602";

export async function fetchWeatherData(lat, lon) {
  try {
    const weatherUrl = `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${lat},${lon}&aqi=yes&days=4&alerts=yes`;

    const weatherResponse = await fetch(weatherUrl);
    const data = await weatherResponse.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error; // Rethrow the error to handle it at the calling site
  }
}

const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
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
