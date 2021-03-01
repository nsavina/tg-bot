require('dotenv').config()
const express = require('express');
const post = require('./src/post');
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use('/tg', post);
app.get('/', function(req,res){
  res.sendfile(__dirname + '/public/index.html');
 });

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`)
})

module.exports = app;