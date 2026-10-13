<script lang="ts">
  import Card from "$lib/card.svelte";
  import CommitList from "$lib/commit-list/commit-list.svelte";
  import Link from "$lib/link.svelte";
  import SkillList from "$lib/skill-list/skill-list.svelte";
  import IconBrandOpenSource from "virtual:icons/tabler/brand-open-source";
  import IconGitPullRequest from "virtual:icons/tabler/git-pull-request";
  import { pageContext } from "../store";
  import type { Commit } from "$lib/commit-list/commit";
  import type { CommitDataQuery } from "./+page.server";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  pageContext.set("a little about me");

  const mapCommits = (commitData: CommitDataQuery): Commit[] => {
    return commitData.data.viewer.repositories.nodes.flatMap((repo) => {
      const branchCommits = repo.refs.nodes;
      return branchCommits.flatMap((branch) => {
        const repoCommits = branch.target.history.edges;
        return repoCommits.map((commit) => ({
          repo: repo.isFork ? repo.parent!.nameWithOwner : repo.name,
          url: commit.node.url,
          message: commit.node.message,
          date: commit.node.committedDate,
          author: {
            name: commit.node.author.name,
            avatar_url: commit.node.author.avatarUrl,
          },
        }));
      });
    });
  };
</script>

<svelte:head>
  <title>what's here</title>
</svelte:head>

<div class="flex flex-col space-y-4">
  <div class="max-w-lg space-y-4">
    <h1 class="text-orange">
      <span>what's here</span>
    </h1>
    <p>
      I'm Jaden, a software engineer from South Africa interested in exploring performance-oriented programming. I also
      enjoy visual design work. Currently working on an <Link href="/projects/ir" decorated>audio plugin</Link> and research
      related to data-oriented narrative architectures in games.
    </p>
  </div>
  <div class="flex flex-col md:flex-row mb-10 md:mb-0 md:h-[35vh]">
    <Card
      cardClassName="md:w-1/2 h-[35vh] md:h-full  border-border"
      Icon={IconGitPullRequest}
      cardTitle="Recent Commits"
      tooltip="Recent commits I've made to repositories on GitHub."
      hoverEffects
    >
      <!-- {#await data.commitData}
              loading
            {:then commitData} -->
      {#if data.commitData}
        <CommitList commits={mapCommits(data.commitData)} />
      {/if}
      <!-- {/await} -->
    </Card>
    <Card
      cardClassName="md:w-1/2 h-[35vh] md:h-full p-0"
      Icon={IconBrandOpenSource}
      cardTitle="Technologies"
      tooltip="Technologies I have enjoyed using for some of my projects."
      hoverEffects
    >
      <SkillList />
    </Card>
  </div>
</div>
