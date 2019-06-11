const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');
const Extra = require('telegraf/extra');

const buildHtmlMessage = require('../../helpers/buildHtmlMessage');
const htmlMessageTypes = require('../../../../constants/bot/htmlMessageTypes');
const sceneConsts = require('../../../../constants/bot/scenes');
const commandsConsts = require('../../../../constants/bot/commands');

const eventsScene = new Scene(sceneConsts.EVENTS);

eventsScene.enter((ctx) => {
  try {
    const eventsList = ctx.session.botState.getIn(['events', 'list']).toJS();

    eventsList.forEach((event) => {
      ctx.replyWithHTML(
        buildHtmlMessage(htmlMessageTypes.EVENT, event),
        Extra.markup((m) =>
          m.inlineKeyboard([
            m.urlButton('🔍 Детальнее', event.link)
          ])
        )
      );
    });
    return ctx.reply(
      `Список докладов`, 
      Markup
        .keyboard([
          [commandsConsts.OTHER_EVENTS]
        ])
        .resize()
        .extra()
    );
  } catch (error) {
    return ctx.replyWithHTML('<b>Ошибка!</b> Что-то пошло не так, попробуй заново...');
  }
});

module.exports = eventsScene;