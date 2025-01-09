import { RedisMapCache } from "@sylo-digital/kas";
import { redisConnection } from "../../get-redis-connection";

export const artistMapCache = new RedisMapCache(redisConnection, "artist-cache", { defaultExpiry: "2s" });
export * from "./recent-artists";
