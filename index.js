const { Composer, Stage, log, session } = require('micro-bot');

const botActionsListener = require('./src/bot/botActionsListener');
const scenes = require('./src/bot/scenes');
const helpers = require('./src/bot/helpers');
const sceneConsts = require('./constants/bot/scenes');
const botState = require('./constants/bot/state');

const bot = new Composer();
const stage = new Stage(scenes, { ttl: 1800 }); // ttl = 30 min

/**
 * Middlewares
 */
bot.use(log());
bot.use(session());
bot.use(stage.middleware());
bot.use((ctx, next) => {
  if (!ctx.session.botState) {
    ctx.session.botState = helpers.resetStateScenePresense(botState).setIn(['initial', 'presense'], true);
  }
  return next();
});

/**
 * Commands
 */
bot.start((ctx) => {
  ctx.session.botState = helpers.resetStateScenePresense(botState).setIn(['initial', 'presense'], true);
  return ctx.scene.enter(sceneConsts.INITIAL);
});

bot.hears(/[\s\S]+/g, botActionsListener);

module.exports = bot;
