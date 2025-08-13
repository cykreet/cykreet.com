import type { Technology, TechnologyMeta } from "../skill-list/skill";

export interface Project {
	name: string;
	slug?: string;
	hero?: string;
	// status: string;
	description: string;
	component: ConstructorOfATypedSvelteComponent;
	publishedDate: Date;
	technologies?: Record<Technology, TechnologyMeta>;
	website?: URL;
	github?: URL;
}

export interface ProjectFrontmatter {
	name: string;
	description: string;
	hero?: string;
	technologies?: string[];
	publishedDate: string;
	website?: string;
	github?: string;
}
