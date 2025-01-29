<script lang="ts">
  import { Skills } from "./skill";
  import TechIcon from "./tech-icon.svelte";

  const skills = Object.entries(Skills)
    .map(([name, meta]) => ({ name, meta }))
    .sort((a, b) => a.name.localeCompare(b.name));
</script>

<div class="grid grid-flow-row grid-cols-4 gap-4">
  {#each skills as { name, meta }}
    <TechIcon {name} {meta} />
  {/each}
</div>
