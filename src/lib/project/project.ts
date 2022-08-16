export interface Project {
	name: string;
	summary: string;
	// description: string;
	tags?: ProjectTag[];
}

export enum ProjectTag {
	Typescript = "typescript",
	Rust = "rust",
	React = "react",
}
