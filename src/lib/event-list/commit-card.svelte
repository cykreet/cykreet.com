<script lang="ts">
  import prettyMs from "pretty-ms";
  import Link from "../link.svelte";
  import type { Commit } from "./event";
  import Pill from "../pill.svelte";
  import { parseConventionalCommit } from "./parse-commit";

  let { commit }: { commit: Commit } = $props();

  const repoName = commit.repo.split("/")[1];
  const prettyTime = prettyMs(new Date().getTime() - new Date(commit.date).getTime(), { compact: true, verbose: true });
  const parsedCommit = parseConventionalCommit(commit.message);
</script>

<Link href={commit.url}>
  <div class="flex flex-col py-2 space-y-1 hover:translate-x-2 transition duration-75 group">
    <div class="inline-flex justify-between">
      <div class="flex max-w-full space-x-2">
        {#if parsedCommit.type}
          <Pill className="!px-2 !p-0 text-grey-300 border-grey-300 {parsedCommit.classes}">
            {parsedCommit.type}
          </Pill>
        {/if}
        {#if parsedCommit.scope}
          <span>{parsedCommit.scope}</span>
        {/if}
        <span title={parsedCommit.description} class="overflow-x-hidden text-ellipsis whitespace-nowrap max-w-[24rem]">
          {parsedCommit.description}
        </span>
      </div>
      <span class="opacity-50">{repoName}</span>
    </div>
    <div class="inline-flex text-sm space-x-2 items-center">
      <img src={commit.author.avatar_url} alt={commit.author.name} class="w-4 h-4 rounded-full" />
      <span class="opacity-75">{commit.author.name} committed {prettyTime} ago</span>
    </div>
  </div>
</Link>
