<script lang="ts">
	import { onMount } from "svelte";
	import type { Project } from "../../../lib/project/project";
	import { pageContext } from "../../../store";
	import type { PageLoad } from "./$types";

	export let data: PageLoad;
	const { project } = data as unknown as { project: Project };

	onMount(() => ($pageContext = "short text goes here"));
</script>

<div>
	<h3>{project.name}</h3>
	<p>{project.description}</p>
</div>
