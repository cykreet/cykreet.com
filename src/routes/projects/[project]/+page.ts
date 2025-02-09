import type { PageLoad } from "../$types";
import { _projects } from "../+page";

export const load = (({ params }) => {
	const project = params.project;
	const metadata = _projects[project];
	return { metadata };
}) satisfies PageLoad;
