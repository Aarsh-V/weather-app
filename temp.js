import React, { useState, useEffect } from "react";
import Weathercard from "./Weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Pune");
  const [tempInfo, setTempInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWeatherInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=8131e8eaeb0ab322435c21d0343c2cd1`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message);
        setLoading(false);
        return;
      }

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch weather data");
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, [searchValue]);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <Weathercard {...tempInfo} />
      )}
    </>
  );
};

export default Temp;

