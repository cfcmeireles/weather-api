const request = require("request");
const client = require("../redis-client");

const getWeather = (req, res) => {
  const city = req.params.city;
  const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

  request(
    `${url}${city}?key=${process.env.API_KEY}`,
    async (error, response, body) => {
      if (error) {
        console.error("Request error:", error);
        return;
      }
      if (response.statusCode !== 200) {
        console.error("HTTP error:", response.statusCode);
        return;
      }
      try {
        const data = JSON.parse(body);
        // Set data to Redis
        await client.set(city, data.currentConditions.temp, {
          EX: 3600,
        });
        res.send(
          `The current temperature in ${city} is ${data.currentConditions.temp}ºF`
        );
      } catch (err) {
        console.error("Error:", err);
      }
    }
  );
};
// Cache middleware
const cache = async (req, res, next) => {
  const city = req.params.city;

  try {
    const data = await client.get(city);
    if (data) {
      return res.send(
        `The current temperature in ${city} is ${data}ºF (from cache)`
      );
    }
    next();
  } catch (err) {
    console.error("Redis error:", err);
    next();
  }
};

module.exports = {
  getWeather,
  cache,
};
