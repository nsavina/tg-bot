const axios = require('axios');
const TOKEN = process.env.BOT_TOKEN;
const URL = `https://api.telegram.org/bot${TOKEN}`;

const makeRequest = (body, method, res) => {
  axios.post(`${URL}/${method}`, body)
  .then(({ data }) => {
    res.status(200)
    res.json(data);
  })
  .catch((_) => res.status(500))
};

const sendTextMessage = (body, res) => {
  const { chat, text, options } = body;
  makeRequest({ chat_id: chat.id, text, ...options }, 'sendMessage', res)
}

module.exports.sendTextMessage = sendTextMessage;

const sendVoiceMessage = (body, res) => {
  const { chat, voice } = body;
  makeRequest({ chat_id: chat.id, voice: voice.file_id }, 'sendVoice', res)
}

module.exports.sendVoiceMessage = sendVoiceMessage;

const sendVideoNoteMessage = (body, res) => {
  const { chat, video_note } = body;
  makeRequest({ chat_id: chat.id, video_note: video_note.file_id }, 'sendVideoNote', res)
}

module.exports.sendVideoNoteMessage = sendVideoNoteMessage;

const sendLocationMessage = (body, res) => {
  const { chat, location } = body;
  makeRequest({ chat_id: chat.id, ...location }, 'sendLocation', res)
}

module.exports.sendLocationMessage = sendLocationMessage;