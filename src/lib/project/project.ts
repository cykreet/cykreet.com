import type { Technology, TechnologyMeta } from "../skill-list/skill";

export interface Project {
	name: string;
	slug: string;
	// status: string;
	description: string;
	technologies?: Record<Technology, TechnologyMeta>;
	publishedDate: Date;
}

export interface ProjectFrontmatter {
	name: string;
	description: string;
	technologies?: string[];
	publishedDate: string;
}
