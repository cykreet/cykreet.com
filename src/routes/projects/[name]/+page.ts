import type { Project } from "../../../lib/project/project";
import type { PageLoad } from "./$types";

// todo: replace with cdn or served file or something
export const _projects: Project[] = [
	{
		name: "alligator",
		publishedDate: new Date("2022-06-17"),
		description: "Discord webhook proxy server, batches sequential requests to minimise ratelimits.",
	},
	{
		name: "cykreet.com",
		publishedDate: new Date("2022-06-2"),
		description: "This very website, built with sveltekit and tailwind.",
	},
];

export const load = (({ params }) => {
	return {
		project: _projects.find((project) => project.name === params.name),
	};
}) satisfies PageLoad;
