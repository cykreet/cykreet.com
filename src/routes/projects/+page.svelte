<script lang="ts">
  import { IconBrandGithub, IconDots } from "@tabler/icons-svelte";
  import { pageContext } from "../../store";
  import { _projects } from "./+page";
  import ProjectCard from "$lib/project/project-card.svelte";
  import Link from "$lib/link.svelte";

  const sortedProjects = _projects.sort((a, b) => a.name.localeCompare(b.name));
  pageContext.set("notable projects i've been working on");
</script>

<svelte:head>
  <title>Projects</title>
</svelte:head>

<div class="flex flex-col space-y-8">
  {#each sortedProjects as project}
    <div class="flex flex-row space-x-4">
      <div class="flex flex-col items-center">
        <span class="relative inline-flex bg-grey-400 rounded-full h-2 w-2 p-0.5 mt-1 stroke-none"></span>
        <div class="w-0.5 h-full from-grey-400 bg-gradient-to-b to-transparent"></div>
      </div>
      <button onclick={() => pageContext.set(undefined)}>
        <Link href={`/projects/${project.slug ?? project.name.toLowerCase()}`}>
          <ProjectCard {project}></ProjectCard>
        </Link>
      </button>
    </div>
  {/each}
  <div class="flex flex-col mx-auto text-sm text-center space-y-2 max-w-60 text-grey-200">
    <IconDots class="w-6 h-6 mx-auto opacity-75" />
    <span>+ a few more on github if you're curious</span>
    <Link className="mx-auto" href="https://github.com/cykreet?tab=repositories">
      <IconBrandGithub class="w-4 h-4" />
    </Link>
  </div>
</div>
