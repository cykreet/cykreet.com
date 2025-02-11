import type { PageLoad } from "../$types";
import { _projects } from "../+page";

export const load = (({ params }) => {
	const project = params.project;
	const projectModule = _projects.find((p) => p.name.toLowerCase() === project);
	return projectModule;
}) satisfies PageLoad;
