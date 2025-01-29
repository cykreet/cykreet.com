import type { Project, ProjectFrontmatter } from "$lib/project/project";
import { Skills, type TechnologyMeta } from "$lib/skill-list/skill";

// mdsvex exports a `metadata` property on the module object that exposes the frontmatter
type ProjectModules = Record<string, { metadata: ProjectFrontmatter }>;

const projectModules = import.meta.glob("./**/*.svx", { eager: true }) as ProjectModules;
export const _projects: Project[] = Object.values(projectModules).map((module) => {
	// todo: slug from project path
	const parsedDate = new Date(module.metadata.publishedDate);
	const technologies: Record<string, TechnologyMeta> = {};
	// maybe remove sorting here, so order can be presented on projects page as needed
	for (const tech of (module.metadata.technologies || []).sort((a, b) => a.localeCompare(b))) {
		technologies[tech] = Skills[tech as keyof typeof Skills];
	}

	return {
		...module.metadata,
		technologies,
		publishedDate: parsedDate,
	};
});
