export interface Project {
  name: string;
  summary: string;
  links?: ProjectLinks;
  tags?: ProjectTag[];
}

export interface ProjectLinks {
  github?: string;
  website?: string;
}

export enum ProjectTag {
  Typescript = 'typescript',
  Rust = 'rust',
  React = 'react',
}
