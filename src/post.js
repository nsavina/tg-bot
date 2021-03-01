require('dotenv').config()
const express = require('express');
const router = express.Router();
const postHandlers = require('./postHandlers');

const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Кнопка 1', callback_data: 'Button 1' }],
      [{ text: 'Кнопка 2', callback_data: '2' }],
      [{ text: 'Кнопка 3', callback_data: 'btn3' }]
    ]
  })
};

const handleGetMessage = (message, res) => {
  if (message.text) {
    const args = {
      ...message
    }
    if (message.text === 'buttons') {
      args.options = options;
    }
    postHandlers.sendTextMessage(args, res)
  }
  else if (message.voice) {
    postHandlers.sendVoiceMessage(message, res)
  }
  else if (message.video_note) {
    postHandlers.sendVideoNoteMessage(message, res)
  }
  else if (message.location) {
    postHandlers.sendLocationMessage(message, res)
  }
  // res.status(500);
  throw new TypeError('Unknown message');
}

const handleGetEditedMessage = (message, res) => {
  if (message.chat && message.message_id) {
    const { chat, message_id } = message;
    const args = {
      chat,
      text: `edited message ${message_id}`
    }
    postHandlers.sendTextMessage(args, res)
  }

  // res.status(500);
  throw new TypeError('Empty message');
}

const handleKeyboardButtonPush = (callback_query, res) => {
  if (callback_query.message && callback_query.data) {
    if (callback_query.message.chat) {
      const args = {
        chat: callback_query.message.chat,
        text: callback_query.data
      }
      postHandlers.sendTextMessage(args, res);
    }

    throw new TypeError('Empty message in callback_query');
  }

  // res.status(500);
  throw new TypeError('Empty callback_query');
}

router.post('/', (req, res) => {
  const body = req.body;

  if (body && body.message) {
    handleGetMessage(body.message, res)
  }
  else if (body && body.edited_message) {
    handleGetEditedMessage(body.edited_message, res)
  }
  else if (body && body.callback_query) {
    handleKeyboardButtonPush(body.callback_query, res)
  }

  // res.status(500);
  throw new TypeError('Empty request body');
});

module.exports = router;