import type { Project } from "$lib/project/project";

// mdsvex exports a `metadata` property on the module object
type ProjectModules = Record<string, { metadata: Project }>;

const projectModules = import.meta.glob("./**/*.svx", { eager: true }) as ProjectModules;
export const _projects: Project[] = Object.values(projectModules).map((module) => module.metadata);
