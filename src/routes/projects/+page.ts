import type { Project, ProjectFrontmatter } from "$lib/project/project";
import { Skills, type TechnologyMeta } from "$lib/skill-list/skill";

// mdsvex exports a `metadata` property on the module object that exposes the frontmatter
type ProjectModules = Record<string, { metadata: ProjectFrontmatter; default: ConstructorOfATypedSvelteComponent }>;

const projectModules = import.meta.glob("$lib/**/project/markdown/*.md", { eager: true }) as ProjectModules;
export const _projects: Project[] = Object.values(projectModules).map((module) => {
	// todo: slug from project path
	const parsedDate = new Date(module.metadata.publishedDate);
	const technologies: Record<string, TechnologyMeta> = {};
	// maybe remove sorting here, so order can be presented on projects page as needed
	for (const tech of (module.metadata.technologies || []).sort((a, b) => a.localeCompare(b))) {
		technologies[tech] = Skills[tech as keyof typeof Skills];
	}

	if (module.metadata.website && URL.canParse(module.metadata.website) == false) {
		throw new Error(`Invalid website for project ${module.metadata.name}: ${module.metadata.website}`);
	}

	if (module.metadata.github?.startsWith("https")) {
		throw new Error(
			`GitHub metadata should only consist of user/repo ${module.metadata.name}: ${module.metadata.github}`,
		);
	}

	return {
		...module.metadata,
		technologies,
		website: module.metadata.website ? new URL(module.metadata.website) : undefined,
		github: module.metadata.github ? new URL(`https://github.com/${module.metadata.github}`) : undefined,
		component: module.default,
		publishedDate: parsedDate,
	};
});
