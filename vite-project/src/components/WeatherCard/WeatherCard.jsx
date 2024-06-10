import "./weatherCard.css";
import clowdy from "../../images/clowdy.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg;</p>
      <img src={clowdy} alt="clowdy" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
