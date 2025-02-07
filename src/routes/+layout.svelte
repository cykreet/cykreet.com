<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import Card from "$lib/card.svelte";
  import EventList from "$lib/event-list/event-list.svelte";
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

  let { data, children }: LayoutProps = $props();

  let pageLocation = $state("");
  let pageDescription = $state<string | undefined>(undefined);
  let homeCardClasses = $derived(
    clsx("w-full md:h-1/2 overflow-hidden relative z-0", pageLocation === "/" ? "block" : "hidden md:block"),
  );
  let currentTime = $state(new Date());
  let timeString = $state("");
  $effect(() => {
    timeString = `${currentTime.getHours().toString().padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}:${currentTime.getSeconds().toString().padStart(2, "0")}`;

    pageLocation = $page.url.pathname;
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
</script>

<main>
  <div class="mx-10">
    <Header />
    <div class="mt-4 flex flex-col-reverse justify-end md:flex-row w-full md:space-x-5 md:space-y-0 space-y-5 h-[88vh]">
      <div class="md:w-8/12 space-y-5 flex flex-col h-1/5 md:h-full">
        <Card cardClassName={homeCardClasses}>
          <div class="card-glow"></div>
          <div class="flex w-full justify-between">
            <div class="max-w-lg space-y-4">
              <h1 class="text-salmon">
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
            cardClassName="w-full h-1/2 md:h-full"
            Icon={IconGitPullRequest}
            cardTitle="Recent Commits"
            tooltip="Recent commits I've made to repositories on GitHub."
            hoverEffects
          >
            {#if data.events}
              <EventList events={data.events} />
            {/if}
          </Card>
          <!-- <Card
              cardClassName="w-full h-1/4 md:h-full"
              icon={IconBrandSpotifyFilled}
              cardTitle="Listening Activity"
              hoverEffects
            >
              {#if data.artists}
                <ArtistsList artists={data.artists} />
              {/if}
            </Card> -->
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
      <Card cardClassName="md:w-4/12 card-gradient h-4/5 md:h-full overflow-hidden" className="flex flex-col space-y-6">
        <span class="inline-flex items-center space-x-4 font-medium">
          {#if (pageLocation.match(/\//gi) || []).length > 1}
            <button onclick={() => history?.back()} class="hover:text-white cursor-pointer">
              <IconArrowLeft class="w-6 h-6" />
            </button>
          {/if}
          <Pill decorated className="w-full min-w-20 text-ellipsis overflow-x-hidden">
            <span class="relative inline-flex h-2 w-2 m-0 mr-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-salmon opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-salmon"></span>
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
