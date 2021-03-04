const axios = require('axios');
const TOKEN = process.env.BOT_TOKEN;
const URL = `https://api.telegram.org/bot${TOKEN}`;

const makeRequest = (body, method, res) => { // chat_id, data, method (type)
  axios.post(`${URL}/${method}`, body) // внести проверку сюда
  .then(({ data }) => { // тип message с полем chat_id
    // маппер - конвертирует сообщение из тг в мое
    res.status(200)
    res.json(data);
  })
  .catch((_) => res.status(500)) 
};

const sendTextMessage = (body, res) => {
  const { chat, text, options } = body;
  makeRequest({ chat_id: chat.id, text, ...options }, 'sendMessage', res)
}

const sendVoiceMessage = (body, res) => {
  const { chat, voice } = body;
  makeRequest({ chat_id: chat.id, voice: voice.file_id }, 'sendVoice', res)
}

const sendVideoNoteMessage = (body, res) => {
  const { chat, video_note } = body;
  makeRequest({ chat_id: chat.id, video_note: video_note.file_id }, 'sendVideoNote', res)
}

const sendLocationMessage = (body, res) => {
  const { chat, location } = body;
  makeRequest({ chat_id: chat.id, ...location }, 'sendLocation', res)
}

module.exports.sendTextMessage = sendTextMessage;
module.exports.sendVoiceMessage = sendVoiceMessage;
module.exports.sendVideoNoteMessage = sendVideoNoteMessage;
module.exports.sendLocationMessage = sendLocationMessage;