import type { Project } from "../../../lib/project/project";
import type { PageLoad } from "./$types";

// todo: replace with cms or served file or something
export const _projects: Project[] = [
	{
		name: "cykreet.com",
		publishedDate: new Date("2024-10-20"),
		description: "This very website, built with sveltekit and tailwind.",
	},
	{
		name: "Atlas",
		publishedDate: new Date("2023-09-21"),
		description: "Multi-purpose automation platform, primarily focused on extending the Discord messaging platform.",
	},
	{
		name: "alligator",
		publishedDate: new Date("2022-07-19"),
		description: "Discord webhook proxy server, batches sequential requests to minimise ratelimits.",
	},
];

export const load = (({ params }) => {
	return {
		project: _projects.find((project) => (project.slug ?? project.name.toLowerCase()) === params.name.toLowerCase()),
	};
}) satisfies PageLoad;
