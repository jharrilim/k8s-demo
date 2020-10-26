const express = require('express');
const cors = require('cors');

const port = process.env.PORT ?? 9999;
const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN ?? '*',
}));


app.use('/health', (_, res) => {
  res.send('OK');
});

if (!process.env.V1_DISABLED) {
  app.get('/api/v1/date', (_, res) => {
    res.send({ date: new Date().toUTCString() });
  });
}

app.get('/api/v2/date', (req, res) => {
  res.send({
    date: new Date().toISOString(),
    meta: { format: 'iso' }
  });
});

app.listen(port, () => {
  console.log(`Started backend server on ${port}`);
});

process.on('SIGINT', () => {
  console.info("Interrupted");
  process.exit(0);
});
