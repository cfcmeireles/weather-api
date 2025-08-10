const client = require("../services/redis-client");
const axios = require("axios");

const getWeather = async (req, res) => {
  const city = req.params.city;
  const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

  try {
    const response = await axios.get(`${url}${city}`, {
      params: {
        key: `${process.env.API_KEY}`,
      },
    });

    // Set data to Redis
    await client.set(city, JSON.stringify(response.data), {
      EX: 43200,
    });

    return res.json(response.data);
  } catch (error) {
    if (error.response.status === 400) {
      return res.status(400).json({ error: "Invalid city/city code." });
    }
    return res.status(500).json({ error: "Invalid Internal server error." });
  }
};

module.exports = getWeather;
