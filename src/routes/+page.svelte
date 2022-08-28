<script lang="ts">
  import Category from '$lib/category.svelte';
  import type { Project } from '$lib/project/project';
  import { ProjectTag } from '$lib/project/project';
  import ProjectList from '$lib/project/project-list.svelte';

  const projects: Project[] = [
    {
      name: 'Atlas',
      links: {
        website: 'https://atlas.bot',
        github: 'https://github.com/sylodev',
      },
      tags: [ProjectTag.Typescript, ProjectTag.React],
      summary: 'Multi-purpose Discord bot with some pretty crazy customisation options.',
    },
    {
      name: 'kas',
      links: {
        github: 'https://github.com/sylodev/kas',
      },
      tags: [ProjectTag.Typescript],
      summary: 'Typescript caching solution, flexible with redis support.',
    },
    {
      name: 'alligator',
      links: {
        github: 'https://github.com/cykreet/alligator',
      },
      tags: [ProjectTag.Rust],
      summary: 'Discord webhook proxy server, batches sequential requests to minimise ratelimits.',
    },
  ];
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section class="container items-center mx-auto mt-32 text-center">
  <div class="p-8 space-y-2 rounded-md">
    <p>i'll finish this later</p>
  </div>
</section>
<section>
  <Category
    title="Projects"
    description="Some neat things I'm doing on the side. All images are generated with DALL-E."
  >
    <ProjectList {projects} />
  </Category>
</section>
