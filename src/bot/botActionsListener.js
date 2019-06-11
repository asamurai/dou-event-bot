const initialSceneLisntener = require('./scenes/initial/commandsListener');
const citiesSceneLisntener = require('./scenes/cities/commandsListener');
const topicsSceneLisntener = require('./scenes/topics/commandsListener');

const botState = require('../../constants/bot/state');
const commandsConsts = require('../../constants/bot/commands');
const scenesConsts = require('../../constants/bot/scenes');

const botActionsListener = (ctx) => {
  if (ctx.message.text === commandsConsts.OTHER_EVENTS) {
    ctx.session.botState = botState.setIn(['initial', 'presense'], true);
    ctx.scene.enter(scenesConsts.INITIAL);
    return;
  }
  if (ctx.session.botState.getIn(['initial', 'presense'])) {
    initialSceneLisntener.handler(ctx);
    return;
  }
  if (ctx.session.botState.getIn(['cities', 'presense'])) {
    citiesSceneLisntener.handler(ctx);
    return;
  }
  if (ctx.session.botState.getIn(['topics', 'presense'])) {
    topicsSceneLisntener.handler(ctx);
    return;
  }
};

module.exports = botActionsListener;