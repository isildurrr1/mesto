import Popup from "./Popup.js"
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.imagePopup = this._popup.querySelector('.popup__photo');
    this.textPopup = this._popup.querySelector('.popup__text');
  }
  open(image, text) {
    super.open();
    this.imagePopup.src = image;
    this.imagePopup.alt = text;
    this.textPopup.textContent = text;
  }
}
