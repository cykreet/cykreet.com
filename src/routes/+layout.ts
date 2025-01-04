import type { Artist } from "../lib/artists-list/artist";
import type { GithubEvent } from "../lib/event-list/event";
import { storedFetch } from "../lib/storage/stored-fetch";
import type { LayoutLoad } from "./$types";

export const load = (async () => {
	const events = storedFetch<GithubEvent[]>("https://api.github.com/users/cykreet/events");
	const artists = storedFetch<Artist[]>("https://artists.cykreet.workers.dev");
	return { events: await events, artists: await artists };
}) satisfies LayoutLoad;

export const prerender = true;
export const ssr = false;
