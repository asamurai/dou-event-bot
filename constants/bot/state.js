const Immutable = require('immutable');

const botState = Immutable.fromJS({
  initial: {
    presense: false
  },
  cities: {
    presense: false,
    list: [],
    city: null
  },
  topics: {
    presense: false,
    list: [],
    topic: null        
  },
  events: {
    presense: false,
    list: []
  }
});

module.exports = botState;