import type { GithubEvent } from "../lib/event-list/event";
import { storedFetch } from "../lib/storage/stored-fetch";
import type { LayoutLoad } from "./$types";

export const load = (async () => {
	const events = await storedFetch<GithubEvent[]>("https://api.github.com/users/cykreet/events");
	if (!events) return { events: [] };
	return { events: await events.data };
}) satisfies LayoutLoad;

export const prerender = true;
export const ssr = false;
