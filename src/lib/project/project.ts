import AlligatorMarkdown from '$markdown/alligator.md';
import AtlasMarkdown from '$markdown/atlas.md';
import KasMarkdown from '$markdown/kas.md';

export enum ProjectMarkdown {
  'alligator' = AlligatorMarkdown,
  'atlas' = AtlasMarkdown,
  'kas' = KasMarkdown,
}

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
