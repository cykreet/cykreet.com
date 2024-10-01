<script lang="ts">
	import { onMount } from "svelte";
	import type { Project } from "../../../lib/project/project";
	import { pageContext } from "../../../store";

	export let project: Project;

	onMount(() => ($pageContext = project.description));
</script>

<div>
	<p>{project.description}</p>
</div>
