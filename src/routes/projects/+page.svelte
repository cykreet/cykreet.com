<script lang="ts">
	import { onMount } from "svelte";
	import { pageContext } from "../../store";

	onMount(() => {
		pageContext.set("what i've been working on");
	});
</script>

<p>some projects</p>
