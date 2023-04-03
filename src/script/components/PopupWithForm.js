import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._formInputs = this._form.querySelectorAll('.popup__input');
  }
  getInputValues() {
    this._inputsValues = {};
    this._formInputs.forEach(input => {
      this._inputsValues[input.name] = input.value
    });
    return this._inputsValues;
  }
  setInputValues(data) {
    this._formInputs.forEach(input => {
      input.value = data[input.name];
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._submit);
  }
  close() {
    super.close();
    this._form.reset();
  }
}
