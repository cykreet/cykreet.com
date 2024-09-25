<script lang="ts">
	import { EventType, type Commit, type GithubEvent } from "./event";
	import CommitCard from "./commit-card.svelte";

	export let events: GithubEvent[];
	const commits = events
		.filter((event) => event.type === EventType.PushEvent)
		.flatMap((event) => {
			const { commits } = event.payload;
			return commits.map(
				(commit) =>
					({
						repo: event.repo.name,
						url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
						message: commit.message,
						date: event.created_at,
						author: {
							name: commit.author.name,
							avatar_url: event.actor.avatar_url,
						},
					}) as Commit
			);
		});
</script>

<div class="flex flex-col space-y-1 overflow-y-auto h-full pr-2">
	{#each commits as commit}
		<CommitCard {commit} />
		<hr class="mt-2 m-0 border-grey-300" />
	{/each}
</div>
