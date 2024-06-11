import { useState } from "react";
import "../App/App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "" });
  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Main weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
