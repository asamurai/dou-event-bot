const htmlMessageTypes = require('../../../constants/bot/htmlMessageTypes');

const buildEventsMessage = (event) => {
  const messageData = [];

  messageData.push(`<b>Тема</b>: <i>${event.title}</i>`);
  messageData.push(`<b>Где проходит доклад</b>: <i>${event.city}</i>`);
  messageData.push(`<b>Цена</b>: <i>${event.price}</i>`);
  messageData.push(`<b>Дата</b>: <i>${event.date}</i>`);
  messageData.push(`<b>Детали</b>: <i>${event.details}</i>`);

  return messageData.join('\n');
};

const buildHtmlMessage = (type, data) => {
  switch (type) {
  case htmlMessageTypes.EVENT:
    return buildEventsMessage(data);
  default:
    return '<b>Ошибка!</b> Что-то пошло не так, попробуй заново...';
  }
};

module.exports = buildHtmlMessage;
