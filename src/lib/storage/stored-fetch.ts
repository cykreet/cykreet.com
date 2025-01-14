import { RedisMapCache } from "@sylo-digital/kas";
import { redisConnection } from "../helpers/get-redis-connection";

const fetchMapCache = new RedisMapCache(redisConnection, "fetch-cache", { defaultExpiry: "4h" });

export async function storedFetch<Type>(key: string, url: string, options?: RequestInit): Promise<Type | null> {
	const storedData = await fetchMapCache.get(key);
	if (storedData) return storedData as Type;

	const dataResponse = await fetch(url, options);
	if (!dataResponse.ok) {
		console.error(`Failed to fetch data from ${url}: ${dataResponse.status} ${dataResponse.statusText}`);
		return null;
	}

	const jsonData = await dataResponse.json();
	await fetchMapCache.set(key, jsonData);
	return jsonData;
}
