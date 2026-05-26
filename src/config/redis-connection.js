import IoRedis from "ioredis";

const connection = new IoRedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

export default connection;
