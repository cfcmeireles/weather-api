const redis = require("redis");
const redis_port = process.env.REDIS_PORT;

const client = redis.createClient({
  url: `redis://localhost:${redis_port}`,
});

client
  .connect()
  .then(() => console.log("Redis client connected"))
  .catch(console.error);

module.exports = client;
