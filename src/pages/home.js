import { Fragment, useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let response = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: lat,
          lon: long,
          appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
          lang: "pt",
          units: "metric",
        },
      }
    );
    setWeather(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  if (location === false) {
    return alert("Você precisar habilitar a localização.");
  } else if (weather === false) {
    return alert("Carregando informações...");
  } else {
    return (
      <Fragment>
        <h3>
          Clima em {weather["name"]} ({weather["weather"][0]["description"]})
        </h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather["main"]["temp"]}º</li>
          <li>Sensação térmica: {weather["main"]["feels_like"]}º</li>
          <li>Temperatura máxima: {weather["main"]["temp_max"]}º</li>
          <li>Temperatura mínima: {weather["main"]["temp_min"]}º</li>
          <li>Velocidade vento: {weather["wind"]["speed"]}km/h</li>
          <li>Direção do vento: {weather["wind"]["deg"]}</li>
          <li>Pressão: {weather["main"]["pressure"]}hpa</li>
          <li>Umidade: {weather["main"]["humidity"]}%</li>
        </ul>
      </Fragment>
    );
  }
}
