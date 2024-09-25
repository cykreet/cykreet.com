import type { GithubEvent } from "../lib/event-list/event";
import type { LayoutLoad } from "./$types";

export const load = (async ({ fetch }) => {
	const events = fetch('https://api.github.com/users/cykreet/events')
		.then((response) => response.json() as Promise<GithubEvent[]>);

	return {
		events: await events,
	}
}) satisfies LayoutLoad;

export const prerender = true;
