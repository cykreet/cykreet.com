<script lang="ts">
  import { GithubIcon, GlobeIcon } from 'svelte-feather-icons';
  import IconLink from '../icon-link.svelte';
  import Modal from '../modal.svelte';
  import Tag from '../tag.svelte';
  import { ProjectMarkdown, type Project } from './project';

  export let project: Project;
  const projectId = project.name.toLocaleLowerCase();
  let Details: any = ProjectMarkdown[projectId];

  let modalOpen: boolean;
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
    <div class="flex flex-col gap-1 p-3 pb-1 bg-background border-b border-b-grey">
      <img
        class="block min-w-full mx-auto overflow-hidden rounded min-h-64 max-h-64"
        src={`/images/projects/${projectId}.png`}
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
      </div>
      {#if project.links}
        {@const source = project.links.github}
        {@const website = project.links.website}
        <div class="flex flex-row gap-2 my-2">
          {#if source}
            <IconLink icon={GithubIcon} href={source} title="GitHub" />
          {/if}
          {#if website}
            <IconLink icon={GlobeIcon} href={website} title="Website" />
          {/if}
        </div>
      {/if}
    </div>
    <div class="p-3 pt-0">
      <svelte:component this={Details} />
    </div>
  </div>
</Modal>
<div
  on:click={onOpen}
  class="flex flex-col gap-2 transition delay-[10ms] cursor-pointer card bg-grey-700 hover:bg-grey-700/80 overflow-hidden rounded-lg max-w-xs"
>
  <div class="flex flex-col gap-1 p-3 pb-1 bg-background border-b border-b-grey">
    <div class="block object-cover max-w-full overflow-hidden rounded min-h-56 max-h-56">
      <img class="transition saturate-50" src={`/images/projects/${projectId}.png`} alt="" />
    </div>
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
  </div>
  <p class="text-sm p-3 pt-0">{project.summary}</p>
</div>

<style>
  .card {
    @apply border;
    @apply border-grey;
  }

  .card:hover {
    @apply border-x-grey/60;
    @apply border-b-grey/60;
  }

  .card:hover img {
    @apply saturate-100;
    transform: scale(1.1);
  }
</style>
