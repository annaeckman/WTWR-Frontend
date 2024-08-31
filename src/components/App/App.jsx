import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "../App/App.css";

import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getItems, deleteItem, addItem } from "../../utils/Api";
import { registerUser, signinUser, isValidToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (values, onDone) => {
    //first add item to the server, then to the dom
    return addItem(values)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
        onDone();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    return deleteItem(id)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== id
        );
        setClothingItems(updatedClothingItems);
      })
      .catch((error) => {
        console.error("Error deleting this item", error);
      });
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegistration = ({ name, password, email, avatar }) => {
    registerUser({
      name,
      password,
      email,
      avatar,
    })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.data);
        closeActiveModal();
      })
      .catch((res) => {
        console.log(`There is an error in handleUserRegistration: ${res}`);
      });
  };

  const handleLogin = ({ email, password }) => {
    signinUser({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        if (data.token) {
          return isValidToken(data.token);
        }
      })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.data);
        setToken(data.token);
        closeActiveModal();
      })
      .catch((res) => {
        console.log(`There is an error in handleLogin: ${res}`);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        //data is the json response
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <BrowserRouter basename="/se_project_react">
      <div className="app">
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <div className="app__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                isLoggedIn={isLoggedIn}
                handleLoginClick={handleLoginClick}
                handleRegisterClick={handleRegisterClick}
              />

              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                    />
                  }
                />
              </Routes>

              <Footer />
            </div>
            {activeModal === "add-garment" && (
              <AddItemModal
                handleCloseModal={closeActiveModal}
                isOpen={activeModal === "add-garment"}
                onAddItem={onAddItem}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal
                activeModal={activeModal}
                card={selectedCard}
                onClose={closeActiveModal}
                handleDeleteItem={handleDeleteItem}
              />
            )}
            {activeModal === "register" && (
              <RegisterModal
                activeModal={activeModal}
                onClose={closeActiveModal}
                handleRegistration={handleRegistration}
              />
            )}
            {activeModal === "login" && (
              <LoginModal
                activeModal={activeModal}
                onClose={closeActiveModal}
                handleLogin={handleLogin}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
