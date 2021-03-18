const express = require('express');
const router = express.Router();
const sendMessage = require('./sender.ts');
const adaptGetToPostMessage = require('./adapters.js');

router.post('/', (req, res) => {
  const body = req.body;
  if (body) {
    const adaptedMessage = adaptGetToPostMessage(body);
    sendMessage(adaptedMessage.body, adaptedMessage.type, res)
  }
  else throw new TypeError('Empty request body');
});

module.exports = router;