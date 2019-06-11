const Immutable = require('immutable');
const cheerio = require('cheerio');
const axios = require('axios');

const helpers = require('../helpers');

const getTopicList = (city = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = helpers.defineUrl({ city });
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const topicsList = $('select[name="tag"] option').map((i, el) => $(el).text()).get();
      const immutableTopicsList = Immutable.List(topicsList);

      resolve(immutableTopicsList);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = getTopicList;
