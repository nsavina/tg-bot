require('dotenv').config()
const express = require('express');
const router = express.Router()
const axios = require('axios');

const TOKEN = process.env.BOT_TOKEN;
const URL = `https://api.telegram.org/bot${TOKEN}`;

const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Кнопка 1', callback_data: 'Button 1' }],
      [{ text: 'Кнопка 2', callback_data: '2' }],
      [{ text: 'Кнопка 3', callback_data: 'btn3' }]
    ]
  })
};

const handleTextMessage = (body, res) => {
  const { chat, text, options } = body;
  axios.post(`${URL}/sendMessage`, { chat_id: chat.id, text, ...options })
  .then(({ data }) => {
    res.json(data);
  })
}

const handleVoiceMessage = (body, res) => {
  const { chat, voice } = body;
  axios.post(`${URL}/sendVoice`, { chat_id: chat.id, voice: voice.file_id })
  .then(({ data }) => {
    res.json(data);
  })
}

const handleVideoNoteMessage = (body, res) => {
  const { chat, video_note } = body;
  axios.post(`${URL}/sendVideoNote`, { chat_id: chat.id, video_note: video_note.file_id })
  .then(({ data }) => {
    res.json(data);
  })
}

const handleLocationMessage = (body, res) => {
  const { chat, location } = body;
  axios.post(`${URL}/sendLocation`, { chat_id: chat.id, ...location })
  .then(({ data }) => {
    res.json(data);
  })
}

const handleGetMessage = (message, res) => {
  if (message.text) {
    const args = {
      ...message
    }
    if (message.text === 'buttons') {
      args.options = options;
    }
    handleTextMessage(args, res)
  }
  else if (message.voice) {
    handleVoiceMessage(message, res)
  }
  else if (message.video_note) {
    handleVideoNoteMessage(message, res)
  }
  else if (message.location) {
    handleLocationMessage(message, res)
  }
}

const handleGetEditedMessage = (message, res) => {
  const { chat, message_id } = message;
  const args = {
    chat,
    text: `edited message ${message_id}`
  }
  handleTextMessage(args, res)
}

const handleKeyboardButtonPush = (callback_query, res) => {
  const args = {
    chat: callback_query.message.chat,
    text: callback_query.data
  }
  handleTextMessage(args, res);
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
});

module.exports = router;