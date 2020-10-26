const express = require('express');
const { default: Axios } = require('axios');

const app = express();

const DATE_API = process.env.DATE_API ?? 'localhost:8081';
const PORT = process.env.PORT ?? 8080;

app.use(express.static('public'));

app.get('/api/date', (req, res) => {
  Axios.get(`http://${DATE_API}/api/v2/date`)
    .then(axiosResponse => {
      res.send(axiosResponse.data);
    })
    .catch(err => res.status(500).send(err));
});

app
  .listen(PORT, () => console.log(`Listening on :${PORT}`))
  .on('error', console.error);


process.on('SIGINT', () => {
  console.info("Interrupted");
  process.exit(0);
});
