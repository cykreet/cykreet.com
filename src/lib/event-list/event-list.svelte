<script lang="ts">
  import { EventType, type Commit, type GithubEvent } from "./event";
  import CommitCard from "./commit-card.svelte";

  let { events }: { events: GithubEvent[] } = $props();
  const parsedCommits = events
    .filter((event) => event.type === EventType.PushEvent)
    .flatMap((event) => {
      const { commits } = event.payload;
      // will i regret not filtering these and risking a few fuck, shits or cums
      // slipping through the cracks, perhaps
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
          }) as Commit,
      );
    });
</script>

<div class="flex flex-col space-y-1 overflow-y-auto h-full pr-2">
  {#each parsedCommits as commit}
    <CommitCard {commit} />
    {#if parsedCommits.indexOf(commit) + 1 !== parsedCommits.length}
      <hr class="mt-2 m-0 border-grey-400" />
    {/if}
  {/each}
</div>
