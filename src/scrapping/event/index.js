const Immutable = require('immutable');
const cheerio = require('cheerio');
const axios = require('axios');

const eventConst= require('../../../constants/scrapping/events');
const helpers = require('../helpers');

const getEventsList = ({ city = null, topic = null }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = helpers.defineUrl({ city, topic });
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const eventsList = $('article.b-postcard').map((i, el) => {
        const eventLink = $(el).find('h2.title a').attr('href').trim();
        const eventLogo = $(el).find('h2.title img.logo').attr('src').trim();
        const eventTitle = $(el).find('h2.title a')[0].children.find((tag) => tag.type === 'text').data.trim();
        const eventDate = $(el).find('div.when-and-where .date').text().trim();
        const eventCity = $(el).find('div.when-and-where')[0].children.find((tag) => tag.type === 'text').next.next.data.trim();
        const eventPrice = $(el).find('div.when-and-where span[style="margin-left:12px;"]').text().trim();
        const eventDetails = $(el).find('p.b-typo').text().trim();

        return {
          ...eventConst.eventListItem,
          logo: eventLogo,
          title: eventTitle,
          city: eventCity,
          date: eventDate,
          price: eventPrice,
          details: eventDetails,
          link: eventLink
        };
      }).get();
      const immutableEventsList = Immutable.List(eventsList);

      resolve(immutableEventsList);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = getEventsList;
