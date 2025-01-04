import type { Project } from "$lib/project/project";

// mdsvex exports a `metadata` property on the module object that exposes the frontmatter
type ProjectModules = Record<string, { metadata: Omit<Project, "publishedDate"> & { publishedDate: string } }>;

const projectModules = import.meta.glob("./**/*.svx", { eager: true }) as ProjectModules;
export const _projects: Project[] = Object.values(projectModules).map((module) => {
	const parsedDate = new Date(module.metadata.publishedDate);
	return {
		...module.metadata,
		publishedDate: parsedDate,
	};
});
