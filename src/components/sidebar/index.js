import { CiSearch } from "react-icons/ci";
import LineChart from "../chart/LineChart";
import { AsyncPaginate } from "react-select-async-paginate";

import { fetchCities } from "../../api/WeatherApi";
import { useEffect, useState } from "react";

function Sidebar({
  data,
  onSearchChange,
  currentLocation,
  forecast,
  location,
  airQuality,
  current,
  alerts,
}) {
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    const defaultLocation = {
      value: currentLocation,
      label: "Current Location",
    };

    setSearchValue(defaultLocation);
  }, [currentLocation]);

  const loadOptions = async (inputValue) => {
    const citiesList = await fetchCities(inputValue);

    return {
      options: citiesList.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const onChangeHandler = (enteredData) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };

  return (
    <div className="">
      <div className="wrapper mt-3">
        <div className="searchBar">
          <div className="searchInput">
            <AsyncPaginate
              placeholder="Search for cities"
              debounceTimeout={600}
              value={searchValue}
              onChange={onChangeHandler}
              loadOptions={loadOptions}
              className="form-input"
            />
          </div>
          <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
            <CiSearch size={24} />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <div className="temp text-white">
          Temp: {data?.temp_c ? data?.temp_c : current?.temp_c}°
        </div>
        <div className="d-flex justify-content-end text-white">
          <small>
            Wind: WSW {data?.wind_mph ? data?.wind_mph : current?.wind_mph} mph
          </small>
        </div>
      </div>
      <div className="mt-5">
        <LineChart forecast={forecast} />
      </div>
      <div className="mt-4 mb-5 text-white">
        <div className="temp">{data?.city ? data?.city : location?.name}</div>
      </div>
      <div
        className="card hydrogen-card"
        style={{ position: "absolute", bottom: "20px", width: "23%" }}
      >
        <div className="card-content">
          <div className="row main">
            <div className="col-12 weather">
              <img src={data?.condition?.icon} alt="" />
              <br />
              <span className="text-white">{data?.condition?.text}</span>
              <span className="weather-description text-white">
                {data?.last_updated}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="w-100">
                <div className="reading">
                  <span className="wind-value text-white">
                    {" "}
                    {data?.wind_kph} km/h{" "}
                  </span>
                </div>
                <div className="reading">
                  <span className="humidity-value text-white">
                    {" "}
                    {data?.temp_f} F{" "}
                  </span>
                </div>
                <div className="reading">
                  <span className="sun-value"> {data?.humidity} h </span>
                </div>
              </div>
            </div>
            <div className="col-6 temperature">
              <span>{data?.temp_c}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
