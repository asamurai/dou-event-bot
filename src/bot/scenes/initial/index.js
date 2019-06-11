const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');

const sceneConsts = require('../../../../constants/bot/scenes');
const commandsConsts = require('../../../../constants/bot/commands');

const initialScene = new Scene(sceneConsts.INITIAL);

initialScene.enter((ctx) => {
  try {
    return ctx.reply(
      'Выбери тему или город доклада', 
      Markup
        .keyboard([
          [commandsConsts.CHOOSE_CITY, commandsConsts.CHOOSE_TOPIC]
        ])
        .resize()
        .extra()
    );
  } catch (error) {
    return ctx.replyWithHTML('<b>Ошибка!</b> Что-то пошло не так, попробуй заново...');
  }
});

module.exports = initialScene;