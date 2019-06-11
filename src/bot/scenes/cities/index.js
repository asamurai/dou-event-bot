const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');

const commandsConsts = require('../../../../constants/bot/commands');
const sceneConsts = require('../../../../constants/bot/scenes');
const helpers = require('../../helpers');

const citiesScene = new Scene(sceneConsts.CITIES);

citiesScene.enter((ctx) => {
  try {
    const cityList = ctx.session.botState.getIn(['cities', 'list']).toJS();
    const splittedKeyboardCityList = helpers.splitKeyboardArray(cityList);

    return ctx.reply(
      'Выбери город, где будет проходить доклад', 
      Markup
        .keyboard([
          ...splittedKeyboardCityList,
          [commandsConsts.OTHER_EVENTS]
        ])
        .resize()
        .extra()
    );
  } catch (error) {
    return ctx.replyWithHTML('<b>Ошибка!</b> Что-то пошло не так, попробуй заново...');
  }
});

module.exports = citiesScene;