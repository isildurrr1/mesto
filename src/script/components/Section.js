export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items,
    this._renderer = renderer,
    this._container = selector;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this._clear();
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
