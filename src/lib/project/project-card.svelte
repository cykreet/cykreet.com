<script lang="ts">
  import TechIcon from "../skill-list/tech-icon.svelte";
  import type { Project } from "./project";

  let { project }: { project: Project } = $props();

  const technologies = project.technologies
    ? Object.entries(project.technologies)
        .map(([name, meta]) => ({ name, meta }))
        .slice(0, 4)
        .sort((a, b) => a.name.localeCompare(b.name))
    : undefined;
</script>

<div class="rounded-md text-left">
  <h3 class="text-base">{project.name}</h3>
  {#if technologies && technologies.length > 0}
    <div class="flex flex-row space-x-4 mt-2 mb-3">
      {#each technologies as { name, meta }}
        <TechIcon {name} {meta} className="h-10 w-24" />
      {/each}
    </div>
  {/if}
  {#if project.hero}
    <div class="rounded-md border-grey-400/40 w-full p-2 border-2 mb-4">
      <img class="rounded-md" src={`/assets/projects/${project.name.toLowerCase()}.png`} alt={project.name} />
    </div>
  {/if}
  <span class="break-words pr-10">{project.description}</span>
</div>
