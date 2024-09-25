<script lang="ts">
	import prettyMs from "pretty-ms";
	import Link from "../link.svelte";
	import type { Commit } from "./event";
	import Pill from "../pill.svelte";
	import { parseCommit } from "./parse-commit";

	export let commit: Commit;

	const repoName = commit.repo.split("/")[1];
	const prettyTime = prettyMs(new Date().getTime() - new Date(commit.date).getTime(), { compact: true, verbose: true });
	const parsedCommit = parseCommit(commit.message);
</script>

<Link href={commit.url} external>
	<div class="flex flex-col py-2 space-y-1 hover:translate-x-2 transition duration-75">
		<div class="inline-flex justify-between">
			<span>
				{#if parsedCommit.conventional}
					<Pill className="!px-2 !p-0 {parsedCommit.classes}">{parsedCommit.type}</Pill>
				{/if}
				{#if parsedCommit.scope}
					<span>{parsedCommit.scope}</span>
				{/if}
				{parsedCommit.description}
			</span>
			<span class="opacity-50">{repoName}</span>
		</div>
		<div class="inline-flex text-sm space-x-2 items-center">
			<img src={commit.author.avatar_url} alt={commit.author.name} class="w-4 h-4 rounded-full" />
			<span class="opacity-75">{commit.author.name} committed {prettyTime} ago</span>
		</div>
	</div>
</Link>
