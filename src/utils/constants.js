export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../images/day/clear.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "overcast",
    url: new URL("../images/day/overcast.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../images/day/clowdy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rainy",
    url: new URL("../images/day/rainy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "snowy",
    url: new URL("../images/day/snowy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../images/day/thunderstorm.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../images/night/night-clear.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../images/night/night-clowdy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "overcast",
    url: new URL("../images/night/night-overcast.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../images/night/night-rain.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../images/night/night-snow.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "thunder",
    url: new URL("../images/night/night-thunder.svg", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../images/day/default.png", import.meta.url).href,
  },
  night: {
    url: new URL("../images/night/default.png", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 37.871593,
  longitude: -122.272743,
};

export const APIkey = "6fcb02142f78a69eb1ba4adbef553dd5";
