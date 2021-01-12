import React, { Component } from "react";

const API_KEY = "b5c5ad4ff919824094b5a49029ffaa72",
  COORDS = "coords",
  WEATHER_INFO="wetherInfo";

class Weather extends Component {
  constructor(props) {
    super(props);
  }

  getWeather = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;
        localStorage.setItem(WEATHER_INFO,`${temperature} @ ${place}` );
      });
  };

  saveCoords = (coordsObj) => {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
  };

  handleGeoSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      latitude,
      longitude,
    };
    this.saveCoords(coordsObj);
    this.getWeather(latitude, longitude);
  };

  handleGeoError = () => {
    console.log("Cannot access to location of yours");
  };

  askForCoords = () => {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  };

  loadCoords = () => {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
      this.askForCoords();
    } else {
      const parseCoords = JSON.parse(loadedCoords);
      this.getWeather(parseCoords.latitude, parseCoords.longitude);
    }
  };
  render() {
    this.loadCoords();
    return (
      <div>
        <h3>{localStorage.getItem(WEATHER_INFO)}</h3>
      </div>
    );
  }
}
export default Weather;
