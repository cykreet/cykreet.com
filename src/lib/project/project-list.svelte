<script lang="ts">
  import Project from './project.svelte';
  import type { Project as ProjectType } from './project';

  export let projects: ProjectType[];
</script>

<div class="grid gap-4 grid-cols-1 md:grid-cols-3 auto-cols-fr">
  {#each projects as project}
    <Project {project} />
  {/each}
</div>
