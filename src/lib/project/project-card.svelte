<script lang="ts">
	import type { Project } from "./project";
	import { TriangleIcon } from "svelte-feather-icons";

	export let project: Project;

	const projectDate = project.publishedDate.toLocaleString("en-us", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
</script>

<div class="flex flex-row space-x-4 rounded-md">
	<div class="flex flex-col items-center space-y-2">
		<TriangleIcon class="w-3.5 h-3.5 rounded-full fill-salmon mt-1 stroke-none" />
		<div class="w-0.5 h-3/4 from-grey-300 bg-gradient-to-b to-transparent" />
	</div>
	<div class="cursor-pointer flex flex-col space-y-2 max-w-full overflow-x-hidden">
		<div class="flex flex-col">
			<time class="text-sm inline-flex space-x-2 opacity-75">{projectDate}</time>
			<h3 class="hover:text-salmon">{project.name}</h3>
		</div>
		<span class="break-words pr-10">{project.description}</span>
	</div>
</div>
