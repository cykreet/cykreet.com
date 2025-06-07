import { RedisMapCache } from "@sylo-digital/kas";
import { redisConnection } from "../../helpers/get-redis-connection";

export const codeHashMapCache = new RedisMapCache<string>(redisConnection, "resume-codes", {
	defaultExpiry: "12h",
	trackKeys: true,
});

export async function requestResumeCode() {
	const code = crypto.getRandomValues(new Uint16Array(1)).toString();
	const hash = Bun.hash(Math.random()).toString(16);
	await codeHashMapCache.set(code, hash);
	return { code, hash };
}

export async function getResumeHash(code: string) {
	const hash = await codeHashMapCache.get(code);
	return hash;
}

export async function hasResumeHash(hash: string) {
	return (await codeHashMapCache.values()).includes(hash);
}
