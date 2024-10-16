<script lang="ts">
	import { onMount } from "svelte";
	import { GithubIcon, MoreHorizontalIcon, TriangleIcon } from "svelte-feather-icons";
	import Link from "../../lib/link.svelte";
	import ProjectCard from "../../lib/project/project-card.svelte";
	import { pageContext } from "../../store";
	import { _projects } from "./[name]/+page";

	const monthYearProjects = _projects.reduce((acc: { [key: string]: typeof _projects }, current) => {
		const date = new Date(current.publishedDate);
		const monthYear = date.toLocaleString("en-uk", { month: "long", year: "numeric" });
		if (!acc[monthYear]) acc[monthYear] = [];
		acc[monthYear].push(current);
		return acc;
	}, {});

	onMount(() => pageContext.set("what i've been working on"));
</script>

<div class="flex flex-col">
	{#each Array.from(Object.entries(monthYearProjects)) as [monthYear, projects]}
		<div class="flex flex-row space-x-4 rounded-md">
			<div class="flex flex-col items-center">
				<TriangleIcon class="w-4 h-4 rounded-full fill-salmon mt-1 stroke-none" />
				<div class="w-0.5 h-full from-grey-300 bg-gradient-to-b to-transparent" />
			</div>
			<div class="cursor-pointer flex flex-col space-y-1 max-w-full overflow-x-hidden mb-4">
				<time class="text-sm inline-flex space-x-2 opacity-75">{monthYear}</time>
				<div class="flex flex-col space-y-2">
					{#each projects as project}
						<Link href={`/projects/${project.slug ?? project.name.toLowerCase()}`}>
							<ProjectCard {project}></ProjectCard>
						</Link>
					{/each}
				</div>
			</div>
		</div>
	{/each}
	<div class="flex flex-col mx-auto text-sm text-center space-y-3 max-w-60 text-grey-200">
		<MoreHorizontalIcon class="w-6 h-6 mx-auto opacity-75" />
		<span>+ a few more on github if you're curious</span>
		<Link className="mx-auto" href="https://github.com/cykreet?tab=repositories">
			<GithubIcon class="w-4 h-4" />
		</Link>
	</div>
</div>
