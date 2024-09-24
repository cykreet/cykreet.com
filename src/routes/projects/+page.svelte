<script lang="ts">
	import { onMount } from "svelte";
	import { pageContext } from "../../store";
	import ProjectCard from "../../lib/project/project-card.svelte";

	onMount(() => {
		pageContext.set("what i've been working on");
	});
</script>

<div class="flex flex-col space-y-6">
	<ProjectCard project={{ name: "alligator", description: "idk" }}></ProjectCard>
</div>
