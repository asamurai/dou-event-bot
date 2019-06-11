const R = require('ramda');
const Immutable = require('immutable');
const cheerio = require('cheerio');
const axios = require('axios');

const helpers = require('../helpers');
const cityConst = require('../../../constants/scrapping/city');

const getCityList = (topic = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = helpers.defineUrl({ topic });

      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const cityList = $('select[name="city"] option').map((i, el) => $(el).text()).get();
      const replacedCityList = R.map(R.replace(cityConst.ONLINE_RUS, cityConst.ONLINE_ENG), cityList);
      const immutableCityList = Immutable.List(replacedCityList);

      resolve(immutableCityList);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = getCityList;
