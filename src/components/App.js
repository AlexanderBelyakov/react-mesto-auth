import React from "react";
import { Header } from "./Header.js";
import { Main } from "./Main.js";
import { Footer } from "./Footer.js";
import { ImagePopup } from "./ImagePopup.js";
import api from "../utils/Api.js";
import authApi from "../utils/AuthApi.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { EditProfilePopup } from "./EditProfilePopup.js";
import { EditAvatarPopup } from "./EditAvatarPopup.js";
import { AddPlacePopup } from "./AddPlacePopup.js";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.js";
import { Login } from "./Login.js";
import { Register } from "./Register.js";
import { InfoTooltip } from "./InfoTooltip.js";
import success from "../images/success.png";
import fail from "../images/fail.png";

function App() {
  const [isEditProfilePopupOpen, showEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, showAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, showAvatarPopup] = React.useState(false);
  const [selectedCard, showSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, getCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccessText, setIsSuccessText] = React.useState(null);
  const [isSuccessImage, setIsSuccessImage] = React.useState(null);
  const [isInfoTooltipOpen, showInfoTooltip] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(null);

  const navigate = useNavigate();

  function handleSignIn(email, password) {
    authApi
      .signIn(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        navigate("/");
        setUserEmail(email);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignUp(email, password) {
    authApi
      .signUp(email, password)
      .then(() => {
        setIsSuccessText("Вы успешно зарегистрировались!");
        setIsSuccessImage(success);
        navigate("/sign-in");
      })
      .catch(() => {
        setIsSuccessText(`Что-то пошло не так!
        Попробуйте ещё раз.`);
        setIsSuccessImage(fail);
      })
      .finally(() => showInfoTooltip(true));
  }
  
  function handleSignOut() {
    setIsLoggedIn(false);
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([res1, res2]) => {
        setCurrentUser(res1);
        getCards(res2);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi
        .checkTokenValidity(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setUserEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function handleEditAvatarClick() {
    showAvatarPopup(true);
  }

  function handleEditProfileClick() {
    showEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    showAddPlacePopup(true);
  }

  function handleUpdateUser(newUserInfo) {
    api
      .editUserInfo(newUserInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    api
      .editUserAvatar(newAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard)
      .then((res) => {
        getCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    showSelectedCard(card);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        getCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        getCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    showAvatarPopup(false);
    showEditProfilePopup(false);
    showAddPlacePopup(false);
    showSelectedCard(null);
    showInfoTooltip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header route="/sign-in" text="Выйти" userEmail={userEmail} onClick={handleSignOut}/>
                <ProtectedRoute
                  component={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  loggedIn={isLoggedIn}
                />
                <Footer />
              </>
            }
          />

          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />}
          />

          <Route
            path="/sign-in"
            element={
              <>
                <Header route="/sign-up" text="Регистрация" />
                <Login onSignIn={handleSignIn} />
              </>
            }
          />

          <Route
            path="/sign-up"
            element={
              <>
                <Header route="/sign-in" text="Войти" />
                <Register onSignUp={handleSignUp} />
              </>
            }
          />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          signUpImage={isSuccessImage}
          text={isSuccessText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
