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
        console.error('Request error:', error);
        return res.status(500).json({ message: 'Failed to connect to weather service' });
      }

      if (response.statusCode === 400) {
        return res.status(400).json({ message: "Bad request: invalid city or parameters" })
      }

      if (response.statusCode === 401) {
        return res.status(401).json({ message: "Unauthorized: there is a problem with the API key, account or subscription" })
      }

      try {
        const data = JSON.parse(body);

        // Set data to Redis
        await client.set(city, JSON.stringify(data), {
          EX: 43200,
        });
        
        res.send(data);
      } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Failed to fetch weather data" })
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
      return res.json(JSON.parse(data));
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
