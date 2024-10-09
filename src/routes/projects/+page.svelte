<script lang="ts">
	import { onMount } from "svelte";
	import { GithubIcon, MoreHorizontalIcon } from "svelte-feather-icons";
	import Link from "../../lib/link.svelte";
	import ProjectCard from "../../lib/project/project-card.svelte";
	import { pageContext } from "../../store";
	import { _projects } from "./[name]/+page";

	onMount(() => pageContext.set("what i've been working on"));
</script>

<div class="flex flex-col space-y-6">
	{#each _projects.sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()) as project}
		<Link href={`/projects/${project.slug ?? project.name}`}>
			<ProjectCard {project}></ProjectCard>
		</Link>
	{/each}
	<div class="flex flex-col mx-auto text-sm text-center space-y-3 max-w-60 text-grey-200">
		<MoreHorizontalIcon class="w-6 h-6 mx-auto opacity-75" />
		<span>+ a few more on github if you're curious</span>
		<Link external className="mx-auto" href="https://github.com/cykreet?tab=repositories">
			<GithubIcon class="w-4 h-4" />
		</Link>
	</div>
</div>
