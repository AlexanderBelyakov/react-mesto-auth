export function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_open_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__card">
        <form
          onSubmit={props.onSubmit}
          name={props.name}
          method="post"
          className={`popup__form popup__form_for-${props.form}`}
        >
          <h2 className="popup__header">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__button">
            {props.submitText}
          </button>
        </form>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
