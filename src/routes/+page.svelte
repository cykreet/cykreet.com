<script lang="ts">
	import { onMount } from "svelte";
	import { pageContext } from "../store";

	onMount(() => pageContext.set("a little about me"));
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div></div>
