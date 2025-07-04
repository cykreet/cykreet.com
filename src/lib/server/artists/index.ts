import { RedisMapCache } from "@sylo-digital/kas";
import { redisConnection } from "../../../helpers/get-redis-connection";

export const artistMapCache = new RedisMapCache(redisConnection, "artist-cache", { defaultExpiry: "6h" });
export * from "./recent-artists";
