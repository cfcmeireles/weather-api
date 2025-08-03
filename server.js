require("dotenv").config();
const express = require("express");
const port = process.env.PORT;
const app = express();

const { getWeather, cache } = require("./routes/get-weather-route");

app.use("/weather/:city", cache, getWeather);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
