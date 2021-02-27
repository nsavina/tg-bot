require('dotenv').config()
const express = require('express');
const post = require('./post');
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use('/tg', post);

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`)
})

