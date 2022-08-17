<script lang="ts" type="module">
  import { onMount } from 'svelte';
  import Modal from '../modal.svelte';
  import Tag from '../tag.svelte';
  import type { Project } from './project';

  export let project: Project;
  let modalOpen: boolean;
  let details: string = 'loading';

  onMount(async () => {
    // todo: some project names could be problematic
    const importKey = `./markdown/${project.name.toLocaleLowerCase()}.md`;
    const { html } = await import(/* @vite-ignore */ importKey);
    details = html;
  });
</script>

<Modal isOpen={modalOpen} onClose={() => (modalOpen = false)}>
  <div class="flex flex-col gap-2">
    <img
      class="block max-h-64 rounded overflow-hidden min-w-full mx-auto"
      src={`/images/projects/atlas.png`}
      width="358px"
      height="255px"
      alt=""
    />
    <div>
      <span class="flex flex-row align-middle gap-2">
        <h3>{project.name}</h3>
        {#if project.tags}
          <div class="flex flex-row gap-2 my-auto">
            {#each project.tags as tag}
              <Tag>{tag}</Tag>
            {/each}
          </div>
        {/if}
      </span>
      <p class="text-sm">{project.summary}</p>
      <hr class="m-0 my-2 border-t border-[#414141]/30" />
      {@html details}
    </div>
  </div>
</Modal>
<div
  on:click={() => (modalOpen = true)}
  class="flex flex-col gap-2 bg-background/75 transition delay-[10ms] cursor-pointer card hover:bg-background/50 overflow-hidden rounded-lg p-3 max-w-xs"
>
  <!-- svelte-ignore a11y-missing-attribute -->
  <div class="block object-cover max-h-56 rounded overflow-hidden max-w-full">
    <img width="210px" height="224px" class="transition saturate-50" src={`/images/projects/atlas.png`} />
  </div>
  <div>
    <span class="flex flex-row gap-2">
      <h3>{project.name}</h3>
      {#if project.tags}
        <div class="flex flex-row gap-2 my-auto">
          {#each project.tags.slice(0, 2) as tag}
            <Tag>{tag}</Tag>
          {/each}
        </div>
      {/if}
    </span>
    <hr class="m-0 my-1 border-t border-[#414141]/30" />
    <p>{project.summary}</p>
  </div>
</div>

<style>
  .card {
    @apply border;
    @apply border-background;
  }

  .card:hover {
    @apply border-t-[#414141];
    @apply border-x-[#414141]/40;
    @apply border-b-[#414141]/40;
  }

  .card:hover img {
    @apply saturate-100;
    transform: scale(1.1);
  }
</style>
