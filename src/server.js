require("dotenv").config();
const express = require("express");
const port = process.env.PORT;
const app = express();

const getWeather = require("./routes/get-weather-route");
const cache = require("./middleware/cache-middleware");
const limiter = require("./middleware/rate-limit");

app.get("/weather/:city", limiter, cache, getWeather);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
