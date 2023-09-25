const EmptyListTitle = {
  ALLMOVIES: 'There are no movies in our database',
  WATCHLIST: 'There are no movies to watch now',
  HISTORY: 'There are no watched movies now',
  FAVORITES: 'There are no favorite movies now',
};

const NavigationType = {
  ALLMOVIES: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const navigationTitle = (navigationType) => {
  switch (navigationType) {
    case NavigationType.ALLMOVIES: return 'All movies';
    case NavigationType.WATCHLIST: return 'Watchlist';
    case NavigationType.HISTORY: return 'History';
    case NavigationType.FAVORITES: return 'Favorites';
  }
};

export {EmptyListTitle, NavigationType, navigationTitle};
