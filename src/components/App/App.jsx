import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LoginModal from "../LoginModal/LoginModal";
import {
  getItems,
  deleteItem,
  addItem,
  likeItem,
  unlikeItem,
} from "../../utils/Api";
import {
  registerUser,
  signinUser,
  getUserByToken,
  updateUser,
} from "../../utils/auth";
import { getToken, setToken } from "../../utils/token";

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
  const [protectedDestination, setProtectedDestination] = useState("/profile");

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (values, onDone) => {
    //first add item to the server, then to the dom
    return addItem(values, token)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
        onDone();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id, token) => {
    return deleteItem(id, token)
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

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
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

  const handleCardLike = ({ _id, isLiked }) => {
    const id = _id;
    const token = getToken();

    if (!isLiked) {
      likeItem(id, token)
        .then((newCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? newCard : item))
          );
        })
        .catch(console.error);
    }

    if (isLiked) {
      unlikeItem(id, token)
        .then((newCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? newCard : item))
          );
        })
        .catch(console.error);
    }
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
        navigate("/login");
        setCurrentUser(res.data);
        closeActiveModal();
      })
      .catch((res) => {
        console.log(`There is an error in handleUserRegistration: ${res}`);
      });
  };

  const handleEditProfile = ({ name, avatar }) => {
    updateUser({ name, avatar })
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        closeActiveModal();
      })
      .catch((res) => {
        console.log(`There is an error in handleEditProfile: ${res}`);
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    signinUser({ email, password })
      .then((res) => {
        setToken(res.token);
        return getUserByToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate(protectedDestination || "/");
        // add a fn to reset the login form
      })
      .catch((err) => {
        console.error("Login failed", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    // add navigate to main page...
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
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = getToken();
    console.log(token);
    if (!token) {
      return;
    }

    getUserByToken(token)
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        setToken(res.token);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  return (
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
                    handleEditProfileClick={handleEditProfileClick}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    handleLogout={handleLogout}
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
          {activeModal === "edit-profile" && (
            <EditProfileModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              handleEditProfile={handleEditProfile}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
