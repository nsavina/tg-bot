
const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Кнопка 1', callback_data: 'Button 1' }],
      [{ text: 'Кнопка 2', callback_data: '2' }],
      [{ text: 'Кнопка 3', callback_data: 'btn3' }]
    ]
  })
};

const adaptMessage = (message) => {
  let adaptedMessage;

  if (message.text) {
    adaptedMessage = {
      type: 'text',
      body: {
        text: message.text,
      }
    }
    if (message.text === 'buttons') {
      adaptedMessage.options = options;
    }
  }
  else if (message.voice && message.voice.file_id) {
    adaptedMessage = {
      type: 'voice',
      body: {
        voice: message.voice.file_id,
      }
    }
  }
  else if (message.video_note && message.video_note.file_id) {
    adaptedMessage = {
      type: 'video_note',
      body: {
        video_note: message.video_note.file_id,
      }
    }
  }
  else if (message.location) {
    adaptedMessage = {
      type: 'location',
      body: {
        ...message,
      }
    }
  }
  else throw new TypeError('Unknown message type');

  if (message.chat && message.chat.id) {
    adaptedMessage.body.chat_id = message.chat.id;
  }
  else throw new TypeError('No chat id');

  return adaptedMessage;
}

const adaptEditedMessage = (message) => {
  if (message.message_id) {
    if (message.chat && message.chat.id) {
      const { chat, message_id } = message;
      const adaptedMessage = {
        type: 'text',
        body: {
          text: `edited message ${message_id}`,
          chat_id: chat.id,
        }
      }
      return adaptedMessage;
    }
    else throw new TypeError('No chat id');
  }
  else throw new TypeError('No message id');
}

const adaptKeyboardMessage = (callback_query) => {
  if (callback_query.message && callback_query.data) {
    if (callback_query.message.chat && callback_query.message.chat.id) {
      const adaptedMessage = {
        type: 'text',
        body: {
          chat_id: callback_query.message.chat.id,
          text: callback_query.data,
        }
      }
      return adaptedMessage;
    }
    else throw new TypeError('No chat id');
  }
  else throw new TypeError('Empty callback_query');
}

const adaptGetToPostMessage = (body) => {
  if (body.message) {
    return adaptMessage(body.message)
  }
  else if (body.edited_message) {
    return adaptEditedMessage(body.edited_message)
  }
  else if (body.callback_query) {
    return adaptKeyboardMessage(body.callback_query)
  }
  else throw new TypeError('Unknown message type');
}

module.exports.adaptMessage = adaptMessage;
module.exports.adaptEditedMessage = adaptEditedMessage;
module.exports.adaptKeyboardMessage = adaptKeyboardMessage;
module.exports.adaptGetToPostMessage = adaptGetToPostMessage;
