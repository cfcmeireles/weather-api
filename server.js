require("dotenv").config();
const express = require("express");
const redis = require("redis");
const port = process.env.PORT;
const redis_port = process.env.REDIS_PORT;
const app = express();
const client = redis.createClient(redis_port);

const getWeather = require("./routes/get-weather-route");

app.use("/weather/:city", getWeather);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
