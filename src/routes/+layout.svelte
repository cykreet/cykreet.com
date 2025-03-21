<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import { page } from "$app/state";
  import Card from "$lib/card.svelte";
  import CommitList from "$lib/event-list/commit-list.svelte";
  import Header from "$lib/header.svelte";
  import HomeDisplay from "$lib/home-display.svelte";
  import Pill from "$lib/pill.svelte";
  import SkillList from "$lib/skill-list/skill-list.svelte";
  import TimeIcon from "$lib/time-icon.svelte";
  import { IconArrowLeft, IconBrandOpenSource, IconGitPullRequest } from "@tabler/icons-svelte";
  import { Canvas } from "@threlte/core";
  import clsx from "clsx";
  import { onMount } from "svelte";
  import "../app.css";
  import { pageContext } from "../store";
  import type { LayoutProps } from "./$types";
  import type { CommitDataQuery } from "./+layout.server";
  import type { Commit } from "../lib/event-list/event";

  let { data, children }: LayoutProps = $props();

  let pageLocation = $state("");
  let pageDescription = $state<string | undefined>(undefined);
  let currentTime = $state(new Date());
  let timeString = $state("");

  $effect(() => {
    timeString = `${currentTime.getHours().toString().padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}:${currentTime.getSeconds().toString().padStart(2, "0")}`;

    pageLocation = page.url.pathname;
    pageDescription = $pageContext;
  });

  const homeCardClasses = clsx("w-full md:h-1/2 overflow-hidden relative z-0 md:block");
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
      const repoCommits = repo.defaultBranchRef.target.history.edges;
      return repoCommits.map((commit) => ({
        repo: repo.name,
        url: commit.node.url,
        message: commit.node.message,
        date: commit.node.committedDate,
        author: {
          name: commit.node.author.name,
          avatar_url: commit.node.author.avatarUrl,
        },
      }));
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
                <span>welome to my</span>
                <span class="inline-flex items-center space-x-4">
                  <span>corner</span>
                  <TimeIcon className="w-10 h-10" />
                </span>
              </h1>
              <h3>hi, i'm jaden. i go by cykreet in most online spaces and i'm currently a student in south africa.</h3>
            </div>
            <div class="w-1/2">
              <Canvas>
                <HomeDisplay />
              </Canvas>
            </div>
          </div>
        </Card>
        <div class="flex flex-col md:flex-row md:space-x-5 md:space-y-0 space-y-5 md:h-1/2">
          <Card
            cardClassName="w-full md:h-full"
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
            cardClassName="w-full h-1/4 md:h-full p-0"
            Icon={IconBrandOpenSource}
            cardTitle="Technologies"
            tooltip="Technologies I've worked with and am currently learning."
            hoverEffects
          >
            <SkillList />
          </Card>
        </div>
      </div>
      <Card cardClassName="md:w-4/12 card-gradient md:h-full overflow-hidden" className="flex flex-col space-y-6">
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
