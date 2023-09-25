import AbstractView from '../framework/view/abstract-view.js';
import { NavigationType, navigationTitle } from '../utils/const.js';


function creatNavigationItem(navigation) {
  const {type, count} = navigation;

  return `
    <a href="#${type}" class="main-navigation__item main-navigation__item--active">${navigationTitle(type)}
      ${type !== NavigationType.ALLMOVIES ? `<span class='main-navigation__item-count'>${count}</span>` : ''}
    </a>
  `;
}

function creatNavigation(navigationList, currentNavigationType) {
  const navigationItemsTemplate = navigationList
    .map((filter) => creatNavigationItem(filter, currentNavigationType))
    .join('');
  return `
    <nav class="main-navigation">
    ${navigationItemsTemplate}
    </nav>
  `;
}

export default class NavigationView extends AbstractView {
  #navigationList = null;

  constructor({navigationList}) {
    super();
    this.#navigationList = navigationList;
  }

  get template() {
    return creatNavigation(this.#navigationList, 'all');
  }
}
