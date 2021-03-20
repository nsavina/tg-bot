const axios = require('axios');
import { SendMessage, MessageType } from './types/message';
const TOKEN = process.env.BOT_TOKEN;
const TG_URL = `https://api.telegram.org/bot${TOKEN}`;

const METHODS = {
    text: 'sendMessage',
    voice: 'sendVoice',
    video_note: 'sendVideoNote',
    location: 'sendLocation',
}

const sendMessage = (data: SendMessage, type: MessageType = 'text', res) => {
    axios.post(`${TG_URL}/${METHODS[type]}`, { ...data })
    .then(({ data }) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(err.response.status).send(err);
    });
}

module.exports = sendMessage;
