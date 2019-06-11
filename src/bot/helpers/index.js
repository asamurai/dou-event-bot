const R = require('ramda');

const splitKeyboardArray = (cities = [], interval = 10) => R.splitEvery(cities.length/interval, cities);

const resetStateScenePresense = (state) => state
  .setIn(['initial', 'presense'], false)
  .setIn(['cities', 'presense'], false)
  .setIn(['topics', 'presense'], false)
  .setIn(['events', 'presense'], false);

module.exports = {
  splitKeyboardArray,
  resetStateScenePresense
};