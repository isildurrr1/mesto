import { openImagePopup } from "./index.js";

class Card {
  constructor(image, text, templateSelector) {
    this._image = image;
    this._text = text;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#card')
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenImage();
    });
  }

  _handleLikeClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleDeleteClick() {
    this._element.querySelector('.element__trash').parentElement.remove();
  }

  _handleOpenImage() {
    openImagePopup(this._text, this._image);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._text;
    this._element.querySelector('.element__name').textContent = this._text;
    return this._element;
  }
}

export default Card;

