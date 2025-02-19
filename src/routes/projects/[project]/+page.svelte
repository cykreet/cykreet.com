<script lang="ts">
  import TechIcon from "$lib/skill-list/tech-icon.svelte";
  import type { PageProps } from "./$types";

  let { data: project }: PageProps = $props();
  const technologies = project.technologies
    ? Object.entries(project.technologies).map(([name, meta]) => ({ name, meta }))
    : undefined;
</script>

<div class="flex flex-col space-y-4">
  <div>
    <h3>{project.name}</h3>
    <span>{project.description}</span>
  </div>
  {#if project.hero}
    <div class="rounded-md border-grey-400/40 w-full p-2 border-2 mb-4">
      <img class="rounded-md" src={`/assets/projects/${project.name.toLowerCase()}.png`} alt={project.name} />
    </div>
  {/if}
  {#if technologies && technologies.length > 0}
    <div class="flex flex-row space-x-4 mb-3 flex-wrap space-y-4">
      {#each technologies as { name, meta }}
        <TechIcon {name} {meta} className="h-10 w-24" />
      {/each}
    </div>
  {/if}
  <project.component />
</div>
