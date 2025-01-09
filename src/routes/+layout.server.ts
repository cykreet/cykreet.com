import type { GithubEvent } from "$lib/event-list/event";
import { getRecentArtists } from "$lib/server/artists";
import { storedFetch } from "$lib/storage/stored-fetch";
import type { LayoutServerLoad } from "./$types";

export const load = (async () => {
	const events = storedFetch<GithubEvent[]>("events", "https://api.github.com/users/cykreet/events");
	// const artists = storedFetch<Artist[]>("artists", "https://artists.cykreet.workers.dev");
	const artists = getRecentArtists();
	return { events: await events, artists: await artists };
}) satisfies LayoutServerLoad;

export const prerender = true;
export const ssr = true;
