export default class Card {
  constructor(image, text, templateSelector, handleCardClick) {
    this._image = image;
    this._text = text;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#card')
      .content.querySelector(this._templateSelector)
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
    this._element.remove();
  }

  _handleOpenImage() {
    this._handleCardClick(this._image, this._text);
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
