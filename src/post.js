const express = require('express');
const router = express.Router();
const sendMessage = require('./sender.ts');
const adapters = require('./adapters.js');

router.post('/', (req, res) => {
  const body = req.body;
  if (body && Object.keys(body).length !== 0 && body.constructor === Object) {
    const adaptedMessage = adapters.adaptGetToPostMessage(body);
    sendMessage(adaptedMessage.body, adaptedMessage.type, res)
  }
  else throw new TypeError('Empty request body');
});

module.exports = router;