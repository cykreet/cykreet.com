import type { LayoutData } from "./$types";

export const load: LayoutData = async ({}) => {
	const response = await fetch('https://api.github.com/users/cykreet/events');
	const eventData = await response.json();

	return {
		events: eventData,
	}
}

export const prerender = true;
