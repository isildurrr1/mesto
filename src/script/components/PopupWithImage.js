import Popup from "./Popup.js"
export default class PopupWithImage extends Popup {
  constructor(image, text, popupSelector) {
    super(popupSelector);
    this._image = image;
    this._text = text;
  }
  open() {
    const imagePopup = this._popupSelector.querySelector('.popup__photo');
    const textPopup = this._popupSelector.querySelector('.popup__text');
    imagePopup.src = this._image;
    imagePopup.alt = this._text;
    textPopup.textContent = this._text;
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) =>{
      this._handleEscClose(evt);
    });
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if(evt.target === this._popupSelector) this.close()
    })
  }
}
