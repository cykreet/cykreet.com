<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import { page } from "$app/state";
  import Card from "$lib/card.svelte";
  import CommitList from "$lib/commit-list/commit-list.svelte";
  import Header from "$lib/header.svelte";
  import Pill from "$lib/pill.svelte";
  import SkillList from "$lib/skill-list/skill-list.svelte";
  import TimeIcon from "$lib/time-icon.svelte";
  import IconArrowLeft from "virtual:icons/tabler/arrow-left";
  import IconBrandOpenSource from "virtual:icons/tabler/brand-open-source";
  import IconGitPullRequest from "virtual:icons/tabler/git-pull-request";
  import clsx from "clsx";
  import { onMount } from "svelte";
  import "../app.css";
  import { pageContext } from "../store";
  import type { LayoutProps } from "./$types";
  import type { CommitDataQuery } from "./+layout.server";
  import type { Commit } from "../lib/commit-list/commit";

  let { data, children }: LayoutProps = $props();

  let pageLocation = $state("");
  let pageDescription = $state<string | undefined>(undefined);
  let currentTime = $state(new Date());
  let timeString = $state("");

  const homeCardClasses = clsx("w-full md:h-1/2 overflow-hidden relative z-0 md:block");

  $effect(() => {
    timeString = `${currentTime.getHours().toString().padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}:${currentTime.getSeconds().toString().padStart(2, "0")}`;

    pageLocation = page.url.pathname;
    pageDescription = $pageContext;
  });

  onMount(() => {
    const timeInterval = setInterval(() => (currentTime = new Date()), 1000);
    return () => clearInterval(timeInterval);
  });

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

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

<main>
  <div class="mx-2 md:!mx-10">
    <Header />
    <div class="mt-4 flex flex-col-reverse md:flex-row w-full md:space-x-5 md:gap-0 gap-5 md:h-[88vh]">
      <div class="md:w-8/12 space-y-5 flex flex-col h-full md:h-full">
        <Card cardClassName={homeCardClasses}>
          <div class="card-glow"></div>
          <div class="flex w-full justify-between">
            <div class="max-w-lg space-y-4">
              <h1 class="text-lavender">
                <span>welcome to my</span>
                <span class="inline-flex items-center space-x-4">
                  <span>corner</span>
                  <TimeIcon className="w-10 h-10" />
                </span>
              </h1>
              <h3>hi, i'm jaden. i go by cykreet in most online spaces and i'm currently a student in south africa.</h3>
            </div>
          </div>
        </Card>
        <div class="flex flex-col md:flex-row md:space-x-5 md:space-y-0 space-y-5 md:h-1/2 mb-10 md:mb-0">
          <Card
            cardClassName="md:w-1/2 md:h-full h-[50vh]"
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
            cardClassName="md:w-1/2 h-1/4 md:h-full p-0"
            Icon={IconBrandOpenSource}
            cardTitle="Technologies"
            tooltip="Technologies I've worked with and am currently learning."
            hoverEffects
          >
            <SkillList />
          </Card>
        </div>
      </div>
      <Card
        cardClassName="md:w-4/12 card-gradient md:h-full overflow-hidden min-h-[50vh]"
        className="flex flex-col space-y-6"
      >
        <span class="inline-flex items-center space-x-4 font-medium">
          {#if (pageLocation.match(/\//gi) || []).length > 1}
            <button onclick={() => history?.back()} class="hover:text-white cursor-pointer">
              <IconArrowLeft class="w-6 h-6" />
            </button>
          {/if}
          <Pill decorated className="w-full min-w-20 text-ellipsis overflow-x-hidden">
            <span class="relative inline-flex h-2 w-2 m-0 mr-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-lavender opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-lavender"></span>
            </span>
            <span>{pageLocation}</span>
          </Pill>
          <span class="text-sm text-grey-200 inline-flex w-full justify-between">
            <span class="text-ellipsis">{pageDescription ? `$ ${pageDescription}` : undefined}</span>
            <span>[{timeString}]</span>
          </span>
        </span>
        <div class="name-body h-full">
          {@render children()}
        </div>
      </Card>
    </div>
    <!-- 0b2886753f0066756b807533da97ff69 -->
  </div>
</main>
