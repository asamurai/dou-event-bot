const getCityList = require('../../../scrapping/city');
const getEventList = require('../../../scrapping/event');
const topicConst = require('../../../../constants/scrapping/topic');
const scenesConsts = require('../../../../constants/bot/scenes');

const handler = async (ctx) => {
  try {
    const cities = ctx.session.botState.getIn(['cities', 'list']).toJS();
    const topics = ctx.session.botState.getIn(['topics', 'list']).toJS();
    if (topics.includes(ctx.message.text)) {
      const topic = ctx.message.text === topicConst.ALL_TOPICS ? null : ctx.message.text;
      ctx.session.botState = ctx.session.botState
        .setIn(['topics', 'topic'], topic)
        .setIn(['topics', 'presense'], false);
      if (cities.length === 0) {
        const selectedTopic = ctx.session.botState.getIn(['topics', 'topic']);
        const cities = await getCityList(selectedTopic);
        ctx.session.botState = ctx.session.botState
          .setIn(['cities', 'list'], cities)
          .setIn(['cities', 'presense'], true);
        return ctx.scene.enter(scenesConsts.CITIES);
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
      return ctx.reply('Выбери тему доклада на клавиатуре !');
    }
  } catch (error) {
    return ctx.replyWithHTML('<b>Ошибка!</b> Что-то пошло не так, попробуй заново...');
  }
};

module.exports = {
  handler
};