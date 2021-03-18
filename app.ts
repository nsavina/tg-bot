require('dotenv').config();
import express from 'express';
import post from './src/post';
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use('/tg', post);
app.get('/', (req, res) => {
  res.sendfile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`)
})

module.exports = app;