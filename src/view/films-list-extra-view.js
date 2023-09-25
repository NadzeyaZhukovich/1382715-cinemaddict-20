import AbstractView from '../framework/view/abstract-view.js';

function creatFilmsListExtra() {
  return `
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>
  `;
}
export default class FilmsListExtraView extends AbstractView {
  get template() {
    return creatFilmsListExtra();
  }
}
