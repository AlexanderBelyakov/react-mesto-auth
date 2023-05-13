import React from "react";
import { PopupWithForm } from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleInputName(e) {
    setName(e.target.value);
  }

  function handleInputDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      description: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      title={"Редактировать профиль"}
      form={"traveler"}
      name={"editor"}
      submitText={"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            value={name}
            onChange={handleInputName}
            type="text"
            id="name-input"
            placeholder="Имя"
            name="travelerName"
            className="popup__input"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="name-input-error popup__input-error">ОЩИБКА</span>
          <input
            value={description}
            onChange={handleInputDescription}
            type="text"
            id="job-input"
            placeholder="Вид деятельности"
            name="travelerJob"
            className="popup__input"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="job-input-error popup__input-error">ОЩИБКА</span>
        </>
      }
    />
  );
}
