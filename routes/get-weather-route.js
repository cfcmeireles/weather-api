const request = require("request");

const getWeather = (req, res) => {
  const city = req.params.city;
  const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

  request(
    `${url}${city}?key=${process.env.API_KEY}`,
    (error, response, body) => {
      if (response.statusCode !== 200) {
        console.error("Request error:", error);
        return;
      }
      try {
        const data = JSON.parse(body);
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
