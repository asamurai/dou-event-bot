const getCityList = require('../../../scrapping/city');
const getTopicList = require('../../../scrapping/topic');
const commandsConsts = require('../../../../constants/bot/commands');
const scenesConsts = require('../../../../constants/bot/scenes');
const helpers = require('../../helpers');

const handler = async (ctx) => {
  try {
    if (ctx.message.text === commandsConsts.CHOOSE_CITY) {
      const selectedTopic = ctx.session.botState.getIn(['topics', 'topic']);
      const cities = await getCityList(selectedTopic);
      ctx.session.botState = helpers
        .resetStateScenePresense(ctx.session.botState)
        .setIn(['cities', 'list'], cities)
        .setIn(['cities', 'presense'], true);

      return ctx.scene.enter(scenesConsts.CITIES);
    } else if (ctx.message.text === commandsConsts.CHOOSE_TOPIC) {
      const selectedCity = ctx.session.botState.getIn(['cities', 'city']);
      const topics = await getTopicList(selectedCity);
      ctx.session.botState = helpers
        .resetStateScenePresense(ctx.session.botState)
        .setIn(['topics', 'list'], topics)
        .setIn(['topics', 'presense'], true);
      return ctx.scene.enter(scenesConsts.TOPICS);
    } else {
      return ctx.reply('Выбери тему или город доклада');
    }
  } catch (error) {
    return ctx.replyWithHTML('<b>Ошибка!</b> Что-то пошло не так, попробуй заново...');
  }
};

module.exports = {
  handler
};