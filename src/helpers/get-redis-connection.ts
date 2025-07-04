import { REDIS_URL } from "$env/static/private";
import Redis from "ioredis";

if (!REDIS_URL) throw new Error("REDIS_URL environment variable is required");
export const redisConnection = new Redis(REDIS_URL);
