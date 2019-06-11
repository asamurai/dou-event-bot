const urlConst = require('../../../constants/scrapping/url');
const cityConst = require('../../../constants/scrapping/city');
const topicConst = require('../../../constants/scrapping/topic');

const defineUrl = ({ city = null, topic = null }) => {
  const isCityDefined = city && city !== cityConst.ALL_CITIES;
  const isTopicDefined = topic && topic !== topicConst.ALL_TOPICS;
  let url = urlConst.BASIC_URL;

  switch (true) {
  case isCityDefined && isTopicDefined:
    url = `${urlConst.TOPIC_URL}/${topic}/${city}`;
    break;
  case isCityDefined && !isTopicDefined:
    url = `${urlConst.CITY_URL}/${city}/`;
    break;
  case !isCityDefined && isTopicDefined:
    url = `${urlConst.TOPIC_URL}/${topic}`;
    break;
  default:
    break;
  }
  return encodeURI(url);
};

module.exports = {
  defineUrl
};