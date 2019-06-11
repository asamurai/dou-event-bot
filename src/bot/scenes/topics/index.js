const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');

const commandsConsts = require('../../../../constants/bot/commands');
const sceneConsts = require('../../../../constants/bot/scenes');
const helpers = require('../../helpers');

const topicsScene = new Scene(sceneConsts.TOPICS);

topicsScene.enter((ctx) => {
  try {
    const topicsList = ctx.session.botState.getIn(['topics', 'list']).toJS();
    const splittedKeyboardTopicsList = helpers.splitKeyboardArray(topicsList, 15);

    return ctx.reply(
      'Выбери тему доклада', 
      Markup
        .keyboard([
          ...splittedKeyboardTopicsList,
          [commandsConsts.OTHER_EVENTS]
        ])
        .resize()
        .extra()
    );
  } catch (error) {
    return ctx.replyWithHTML('<b>Ошибка!</b> Что-то пошло не так, попробуй заново...');
  }
});

module.exports = topicsScene;