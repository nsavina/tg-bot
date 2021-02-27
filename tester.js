const axios = require('axios');

axios.post('https://d4fe6e868ae9.ngrok.io/tg', { value: 'bbb' }) // симулирует post-запрос
.then(({ data }) => {
  console.log(data)
})