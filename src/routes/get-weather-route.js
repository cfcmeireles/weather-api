const request = require("request");
const client = require("../services/redis-client");

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

module.exports = getWeather;
