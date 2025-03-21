<script lang="ts">
  import CommitCard from "./commit-card.svelte";
  import type { Commit } from "./event";

  const COMMIT_LIMIT = 1000 * 60 * 60 * 24 * 60; // 60 days

  let { commits }: { commits: Commit[] } = $props();
  const filteredCommits = commits.filter((commit) => new Date(commit.date).getTime() > Date.now() - COMMIT_LIMIT);
</script>

<div class="flex flex-col space-y-1 overflow-y-auto h-full pr-2">
  {#each filteredCommits as commit}
    <CommitCard {commit} />
    {#if filteredCommits.indexOf(commit) + 1 !== filteredCommits.length}
      <hr class="my-1/2 m-0 border-grey-400" />
    {/if}
  {/each}
</div>
