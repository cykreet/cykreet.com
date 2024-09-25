<script lang="ts">
	import { onMount } from "svelte";
	import { pageContext } from "../store";
	import { page } from "$app/stores";

	onMount(() => {
		pageContext.set("something went wrong");
	});
</script>

<div class="flex flex-col w-full h-full justify-center text-center">
	<h1>{$page.status}</h1>
	<span>not sure know what you're looking for.</span>
</div>
