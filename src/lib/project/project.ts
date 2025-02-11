import type { Technology, TechnologyMeta } from "../skill-list/skill";

export interface Project {
	name: string;
	slug?: string;
	hero?: string;
	// status: string;
	description: string;
	component: ConstructorOfATypedSvelteComponent;
	technologies?: Record<Technology, TechnologyMeta>;
	publishedDate: Date;
}

export interface ProjectFrontmatter {
	name: string;
	description: string;
	hero?: string;
	technologies?: string[];
	publishedDate: string;
}
