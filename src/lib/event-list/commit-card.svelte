<script lang="ts">
	import Card from "$lib/card.svelte";
	import type { Commit } from "./event";

	export let commit: Commit = undefined;
</script>

<Card className="py-2">
	<span>{commit.message}</span>
</Card>
