import AbstractView from '../framework/view/abstract-view.js';

function creatShowMoreButton() {
  return `
    <button class="films-list__show-more">Show more</button>
  `;
}
export default class ShowMoreButtonView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return creatShowMoreButton();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
