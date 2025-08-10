const client = require("../services/redis-client");

const cache = async (req, res, next) => {
  const city = req.params.city;

  try {
    const data = await client.get(city);
    if (data) {
      return res.send(JSON.parse(data));
    }
    next();
  } catch (err) {
    console.error("Redis error:", err);
    next();
  }
};

module.exports = cache;
