require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT

const getWeather = require('./routes/getWeather');

app.use('/weather/:city', getWeather);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
