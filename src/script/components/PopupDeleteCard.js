import Popup from "./Popup.js";
export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this.submitBtn = this._form.querySelector('.popup__button')
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._submit);
  }
  open(card) {
    super.open();
    this._card = card;
  }
  getCard() {
    return this._card;
  }
}
