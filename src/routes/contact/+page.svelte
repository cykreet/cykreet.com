<script lang="ts">
	import { onMount } from "svelte";
	import { pageContext } from "../../store";

	onMount(() => {
		pageContext.set("let's get in touch");
	});
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>
