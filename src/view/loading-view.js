import AbstractView from '../framework/view/abstract-view.js';

function creatLoading() {
  return `
    <h2 class="films-list__title">Loading...</h2>
  `;
}
export default class LoadingView extends AbstractView {
  get template() {
    return creatLoading();
  }
}
