export function ImagePopup(props) {
  return (
    <div
      className={`popup popup_open_viewer ${props.card ? "popup_opened" : ""}`}
    >
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__image-container">
        <div className="popup__shell">
          <button
            type="button"
            className="popup__close-button popup__close-button_for-image"
            onClick={props.onClose}
          ></button>
          <img
            className="popup__viewed-image"
            src={props.card?.link}
            alt={props.card?.name}
          />
          <p className="popup__image-name">{props.card?.name}</p>
        </div>
      </div>
    </div>
  );
}
