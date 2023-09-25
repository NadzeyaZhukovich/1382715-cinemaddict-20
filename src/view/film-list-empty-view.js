import AbstractView from '../framework/view/abstract-view.js';
import {EmptyListTitle} from '../utils/const.js';


function creatFilmListEmpty() {
  const filmListTitle = EmptyListTitle.ALLMOVIES;
  return `
    <section class="films-list">
      <h2 class="films-list__title">${filmListTitle}</h2>
    </section>
  `;
}
export default class FilmListEmptyView extends AbstractView {
  get template() {
    return creatFilmListEmpty();
  }
}
