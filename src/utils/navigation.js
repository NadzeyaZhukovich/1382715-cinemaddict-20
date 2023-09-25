import { NavigationType } from './const.js';

const navigation = {
  [NavigationType.ALLMOVIES]: (movies) => movies,
  [NavigationType.FAVORITES]: (movies) => movies.filter((movie) => movie.userDetails.favorite),
  [NavigationType.HISTORY]: (movies) => movies.filter((movie) => movie.userDetails.alreadyWatched),
  [NavigationType.WATCHLIST]: (movies) => movies.filter((movie) => movie.userDetails.watchlist),
};

export {navigation};
