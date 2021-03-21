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
app.get('/health-check', (req, res) => res.status(200).send({ v: '0.4' }));

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`)
})

export default app;