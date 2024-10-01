<script lang="ts">
	import { ClockIcon } from "svelte-feather-icons";
	import type { Project } from "./project";

	export let project: Project;

	const projectDate = project.publishedDate.toLocaleString("en-us", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
</script>

<div class="cursor-pointer flex flex-col space-y-2">
	<div class="flex flex-col">
		<h3 class="hover:text-salmon">{project.name}</h3>
		<span class="inline-flex items-center space-x-2 opacity-75">
			<ClockIcon class="w-4 h-4" />
			<time class="text-sm">{projectDate}</time>
		</span>
	</div>
	<span>{project.description}</span>
	<hr class="mt-4 m-0 border-grey-300" />
</div>
