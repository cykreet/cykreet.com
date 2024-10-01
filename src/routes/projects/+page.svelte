<script lang="ts">
	import { onMount } from "svelte";
	import { pageContext } from "../../store";
	import ProjectCard from "../../lib/project/project-card.svelte";
	import { GithubIcon, MoreHorizontalIcon } from "svelte-feather-icons";
	import type { Project } from "../../lib/project/project";
	import Link from "../../lib/link.svelte";

	// todo: replace with cdn or served file or something
	const projects: Project[] = [
		{
			name: "alligator",
			publishedDate: new Date("2022-06-17"),
			description: "Discord webhook proxy server, batches sequential requests to minimise ratelimits.",
		},
		{
			name: "cykreet.com",
			publishedDate: new Date("2022-06-2"),
			description: "This very website, built with sveltekit and tailwind.",
		},
	];

	onMount(() => pageContext.set("what i've been working on"));
</script>

<div class="flex flex-col space-y-6">
	{#each projects.sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()) as project}
		<Link href={`/projects/${project.slug ?? project.name}`} className="hover:text-inherit">
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
