import React from "react";
import { Col, Row } from "reactstrap";

function CityWeatherComponent({ data }) {
  return (
    <Row className="city_wise_weather">
      {data?.forecastday?.map((item, i) => {
        return (
          <Col md={3} key={i}>
            <div className="hydrogen-card">
              <div className="card-content">
                <div className="row main">
                  <div className="col-12 weather">
                    <img src={item.day.condition.icon} alt="" /><br />
                    <span className="text-white">
                    {item?.day?.condition?.text?.split(' ').slice(0, 1)}
                    </span>
                    <span className="weather-description">{item.date}</span>
                  </div>
                </div>
                <div className="row foot">
                  <div className="col-6">
                    <div className="reading">
                      <span className="wind-value">
                        {" "}
                        {item?.day?.maxwind_kph} km/h{" "}
                      </span>
                    </div>
                    <div className="reading">
                      <span className="humidity-value">
                        {" "}
                        {item?.day?.avgtemp_f}%{" "}
                      </span>
                    </div>
                    <div className="reading">
                      <span className="sun-value">
                        {" "}
                        {item?.day?.avgtemp_c}h{" "}
                      </span>
                    </div>
                  </div>
                  <div className="col-6 temperature">
                    <span>{item?.day?.maxtemp_c}°</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}

export default CityWeatherComponent;
