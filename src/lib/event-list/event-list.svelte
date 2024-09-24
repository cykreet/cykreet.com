<script lang="ts">
	import { EventType, type GithubEvent } from "./event";
	import CommitCard from "./commit-card.svelte";

	export let events: GithubEvent[];
	const commits = events
		.filter((event) => event.type === EventType.PushEvent)
		.map((event) => {
			const { created_at, payload } = event;
			const { commits } = payload;
			return commits.map((commit) => ({ created_at, ...commit }));
		})
		.flat();
</script>

<div class="flex flex-col space-y-2 overflow-y-auto h-full pr-2">
	{#each commits as commit}
		<CommitCard {commit} />
	{/each}
</div>
