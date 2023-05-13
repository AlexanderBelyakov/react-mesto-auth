import React from "react";
import { PopupWithForm } from "./PopupWithForm.js";

export function EditAvatarPopup(props) {
  const avatarPopupRef = React.useRef();

  React.useEffect(() => {
    avatarPopupRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarPopupRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      title={"Новое место"}
      form={"avatar"}
      name={"avatar-editor"}
      submitText={"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            ref={avatarPopupRef}
            type="url"
            id="avatar-image-input"
            placeholder="Ссылка на картинку"
            name="avatarImage"
            className="popup__input"
            required
          />
          <span className="avatar-image-input-error popup__input-error">
            ОЩИБКА
          </span>
        </>
      }
    />
  );
}
