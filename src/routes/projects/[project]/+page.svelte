<script lang="ts">
  import { ButtonStyle } from "$lib/button/button";
  import Button from "$lib/button/button.svelte";
  import Link from "$lib/link.svelte";
  import TechIcon from "$lib/skill-list/tech-icon.svelte";
  import type { PageProps } from "./$types";
  import IconBrandGithub from "virtual:icons/tabler/brand-github";
  import IconGlobe from "virtual:icons/tabler/globe";

  let { data: project }: PageProps = $props();
  const technologies = project.technologies
    ? Object.entries(project.technologies).map(([name, meta]) => ({ name, meta }))
    : undefined;
</script>

<div class="flex flex-col space-y-4">
  <div>
    <h3>{project.name}</h3>
  </div>
  {#if technologies && technologies.length > 0}
    <div class="flex flex-row space-x-4 space-y-4 max-w-full overflow-x-auto">
      {#each technologies as { name, meta }}
        <TechIcon {name} {meta} className="h-10 w-24" />
      {/each}
    </div>
  {/if}
  {#if project.hero}
    <div class="rounded-md border-grey-400/40 w-full p-2 border-2">
      <img class="rounded-md" src={`/assets/projects/${project.name.toLowerCase()}.png`} alt={project.name} />
    </div>
  {/if}
  <span>{project.description}</span>
  <project.component />
  <div class="absolute -right-2 -bottom-2 flex space-x-4">
    {#if project.github}
      <Link href={project.github.toString()}>
        <Button className="flex flex-row gap-2 items-center" buttonStyle={ButtonStyle.Glass}>
          <IconBrandGithub />
          {project.github.pathname.slice(1)}
        </Button>
      </Link>
    {/if}
    {#if project.website}
      <Link href={project.website.toString()}>
        <Button className="flex flex-row gap-2 items-center" buttonStyle={ButtonStyle.Glass}>
          <IconGlobe />
          {project.website.hostname}
        </Button>
      </Link>
    {/if}
  </div>
</div>
