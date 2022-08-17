<script lang="ts">
  import Category from '$lib/category.svelte';
  import type { Project } from '$lib/project/project';
  import { ProjectTag } from '$lib/project/project';
  import ProjectList from '$lib/project/project-list.svelte';

  const projects: Project[] = [
    {
      name: 'Atlas',
      tags: [ProjectTag.Typescript, ProjectTag.React],
      summary: 'Atlas offers some of the most advanced customisation features on the Discord platform.',
    },
    {
      name: 'kas',
      tags: [ProjectTag.Typescript],
      summary: 'Flexible caching solution - with robust, built-in TypeScript types and redis support.',
    },
    {
      name: 'alligator',
      tags: [ProjectTag.Rust],
      summary: 'Discord webhook proxy server, batches sequential requests to minimise ratelimits.',
    },
  ];
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section class="items-center container mx-auto text-center mt-32">
  <div class="rounded-md p-8 space-y-2">
    <h1>title</h1>
    <p>this is where you die</p>
  </div>
</section>
<section>
  <Category title="Projects" description="Some neat things I'm doing on the side.">
    <ProjectList {projects} />
  </Category>
</section>
