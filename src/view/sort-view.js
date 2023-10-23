import AbstractView from '../framework/view/abstract-view.js';
import { SortType, SortTitle } from '../utils/const.js';

function creatSort(currentSortType) {


  return `
    <ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}">${SortTitle(SortType.DEFAULT)}</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button ${currentSortType === SortType.DATE ? 'sort__button--active' : ''}">${SortTitle(SortType.DATE)}</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button ${currentSortType === SortType.RATING ? 'sort__button--active' : ''}">${SortTitle(SortType.RATING)}</a></li>
    </ul>
  `;
}

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handelSortTypeChange = null;

  constructor({onSortTypeChange, currentSortType}) {
    super();
    this.#handelSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('click', this.#sortTypeChangeHendler);
  }

  get template() {
    return creatSort(this.#currentSortType);
  }

  #sortTypeChangeHendler = (evt) => {
    if(evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.#handelSortTypeChange(evt.target.dataset.sortType);
  };
}
