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

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const SortTitle = (sortType) => {
  switch (sortType) {
    case SortType.DEFAULT: return 'Sort by default';
    case SortType.DATE: return 'Sort by date';
    case SortType.RATING: return 'Sort by rating';
  }
};

const EmojiType = ['smile', 'sleeping', 'puke', 'angry'];

export {EmptyListTitle, NavigationType, navigationTitle, SortType, SortTitle, EmojiType};
