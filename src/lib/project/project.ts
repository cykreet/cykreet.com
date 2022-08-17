export interface Project {
  name: string;
  summary: string;
  tags?: ProjectTag[];
}

export enum ProjectTag {
  Typescript = 'typescript',
  Rust = 'rust',
  React = 'react',
}
