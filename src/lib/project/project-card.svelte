<script lang="ts">
	import Card from "../card.svelte";
	import type { Project } from "./project";

	export let project: Project;
</script>

<Card className="mt-1 cursor-pointer flex flex-col hover:scale-95 space-y-2 transition hover:border-salmon">
	<div class="inline-flex space-x-2 items-center">
		<span>{project.name}</span>
	</div>
	<span>{project.description}</span>
</Card>
