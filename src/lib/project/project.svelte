<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import Modal from '../modal.svelte';
  import Tag from '../tag.svelte';
  import { GithubIcon, GlobeIcon } from 'svelte-feather-icons';
  import type { Project } from './project';

  export let project: Project;
  let modalOpen: boolean;
  let details: string = "i haven't thought of anything to put here yet.";

  const projectId = project.name.toLocaleLowerCase();
  onMount(async () => {
    const importKey = `./markdown/${projectId}.md`;
    const { html } = await import(/* @vite-ignore */ importKey);
    details = html;
  });

  const onOpen = () => {
    modalOpen = true;
    document.body.style.overflowY = 'hidden';
  };

  const onClose = () => {
    modalOpen = false;
    document.body.style.overflowY = 'overlay';
  };
</script>

<Modal isOpen={modalOpen} {onClose}>
  <div class="flex flex-col gap-2">
    <img
      class="block min-w-full mx-auto overflow-hidden rounded max-h-64"
      src={`${base}/images/projects/${projectId}.png`}
      width="358px"
      height="255px"
      alt=""
    />
    <div>
      <span class="flex flex-row gap-2 align-middle">
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
      {#if project.links}
        {@const source = project.links.github}
        {@const website = project.links.website}
        <div class="flex flex-row gap-2 my-2 text-white">
          {#if source}
            <a href={source} title="GitHub">
              <GithubIcon class="w-4 h-4" />
            </a>
          {/if}
          {#if website}
            <a href={website} title="Website">
              <GlobeIcon class="w-4 h-4" />
            </a>
          {/if}
        </div>
      {/if}
      {@html details}
    </div>
  </div>
</Modal>
<div
  on:click={onOpen}
  class="flex flex-col gap-2 transition delay-[10ms] cursor-pointer card hover:bg-[#131313]/50 overflow-hidden rounded-lg p-3 max-w-xs"
>
  <!-- svelte-ignore a11y-missing-attribute -->
  <div class="block object-cover max-w-full overflow-hidden rounded max-h-56">
    <img class="transition saturate-50" src={`${base}/images/projects/${projectId}.png`} />
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
