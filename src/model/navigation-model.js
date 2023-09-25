import { navigation } from '../utils/navigation.js';

function generateNavigation(movies) {
  return Object.entries(navigation).map(
    ([navigationType, navigationTasks]) => ({
      type: navigationType,
      count: navigationTasks(movies).length,
    }));
}

export {generateNavigation};
