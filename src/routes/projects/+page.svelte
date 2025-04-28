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
    <button onclick={() => pageContext.set(undefined)}>
      <Link href={`/projects/${project.slug ?? project.name.toLowerCase()}`}>
        <ProjectCard {project}></ProjectCard>
      </Link>
    </button>
  {/each}
  <div class="flex flex-col mx-auto text-sm text-center space-y-2 max-w-60 text-grey-200">
    <IconDots class="w-6 h-6 mx-auto opacity-75" />
    <span>+ a few more on github if you're curious</span>
    <Link className="mx-auto" href="https://github.com/cykreet?tab=repositories">
      <IconBrandGithub class="w-4 h-4" />
    </Link>
  </div>
</div>
