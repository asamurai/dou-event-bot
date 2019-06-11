const getTopicList = require('../../../scrapping/topic');
const getEventList = require('../../../scrapping/event');
const cityConst = require('../../../../constants/scrapping/city');
const scenesConsts = require('../../../../constants/bot/scenes');

const handler = async (ctx) => {
  try {
    const cities = ctx.session.botState.getIn(['cities', 'list']).toJS();
    const topics = ctx.session.botState.getIn(['topics', 'list']).toJS();
    if (cities.includes(ctx.message.text)) {
      const city = ctx.message.text === cityConst.ALL_CITIES ? null : ctx.message.text;
      ctx.session.botState = ctx.session.botState
        .setIn(['cities', 'city'], city)
        .setIn(['cities', 'presense'], false);
      if (topics.length === 0) {
        const selectedCity = ctx.session.botState.getIn(['cities', 'city']);
        const topics = await getTopicList(selectedCity);
        ctx.session.botState = ctx.session.botState
          .setIn(['topics', 'list'], topics)
          .setIn(['topics', 'presense'], true);
        return ctx.scene.enter(scenesConsts.TOPICS);
      } else {
        const selectedCity = ctx.session.botState.getIn(['cities', 'city']);
        const selectedTopic = ctx.session.botState.getIn(['topics', 'topic']);
        const events = await getEventList({ city: selectedCity, topic: selectedTopic });
        ctx.session.botState = ctx.session.botState
          .setIn(['events', 'list'], events)
          .setIn(['events', 'presense'], true);
        return ctx.scene.enter(scenesConsts.EVENTS);
      }
    } else {
      return ctx.reply('Выбери город доклада на клавиатуре !');
    }
  } catch (error) {
    return ctx.replyWithHTML('<b>Ошибка!</b> Что-то пошло не так, попробуй заново...');
  }
};

module.exports = {
  handler
};