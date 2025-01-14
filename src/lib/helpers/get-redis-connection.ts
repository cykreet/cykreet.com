import Redis from "ioredis";

if (!process.env.REDIS_URL) throw new Error("REDIS_URL environment variable is required");
export const redisConnection = new Redis(process.env.REDIS_URL);
