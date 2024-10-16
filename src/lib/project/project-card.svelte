<script lang="ts">
	import type { Project } from "./project";

	export let project: Project;
</script>

<div>
	<h3 class="hover:text-salmon">{project.name}</h3>
	<span class="break-words pr-10">{project.description}</span>
</div>
