import Redis from "ioredis";
import logger from "../utils/logger";

const redis = new Redis(process.env.REDIS_URL as string);

redis.on("connect", async () => {
    logger.info("Redis connected");
    // await redis.flushall();
    // logger.info("Redis cache cleared");
});
redis.on("error", (err: Error) => logger.error(`Redis error ${err.message}`));

export default redis;
