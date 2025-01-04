<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import { page } from "$app/stores";
	import Card from "$lib/card.svelte";
	import Header from "$lib/header.svelte";
	import Pill from "$lib/pill.svelte";
	import clsx from "clsx";
	import { onMount } from "svelte";
	import { ArrowLeftIcon } from "svelte-feather-icons";
	import "../app.css";
	import ArtistsList from "../lib/artists-list/artists-list.svelte";
	import EventList from "../lib/event-list/event-list.svelte";
	import TimeIcon from "../lib/time-icon.svelte";
	import { pageContext } from "../store";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;

	let currentTime = new Date();
	let pageLocation: string;
	let homeCardClasses: string;
	let pageDescription: string;

	$: hours = currentTime.getHours().toString().padStart(2, "0");
	$: minutes = currentTime.getMinutes().toString().padStart(2, "0");
	$: seconds = currentTime.getSeconds().toString().padStart(2, "0");

	$: {
		pageLocation = $page.url.pathname;
		homeCardClasses = clsx("w-full md:h-1/2", pageLocation === "/" ? "block" : "hidden md:block");
		pageDescription = $pageContext;
	}

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
		<div class="mt-4 flex flex-col-reverse justify-end md:flex-row w-full md:space-x-5 md:space-y-0 space-y-5 h-[90vh]">
			<div class="md:w-8/12 space-y-5 flex flex-col h-1/5 md:h-full">
				<Card cardClassName={homeCardClasses} hoverEffects>
					<div class="max-w-lg space-y-4">
						<h1 class="text-inherit text-salmon">
							<span>welome to my</span>
							<span class="inline-flex items-center space-x-4">
								<span>corner</span>
								<TimeIcon className="w-10 h-10" />
							</span>
						</h1>
						<h3>hi, i'm jaden. i go by cykreet in most online spaces and i'm currently a student in south africa.</h3>
					</div>
				</Card>
				<div class="flex flex-col md:flex-row md:space-x-5 md:space-y-0 space-y-5 md:h-1/2">
					<Card cardClassName="w-full h-1/2 md:h-full" cardTitle="Recent Commits" hoverEffects>
						{#if data.events}
							<EventList events={data.events} />
						{/if}
					</Card>
					<Card cardClassName="w-full h-1/4 md:h-full" cardTitle="Listening Activity" hoverEffects>
						{#if data.artists}
							<ArtistsList artists={data.artists} />
						{/if}
					</Card>
				</div>
			</div>
			<Card cardClassName="md:w-4/12 card-gradient h-4/5 md:h-full" className="flex flex-col space-y-6 ">
				<span class="inline-flex items-center space-x-4 font-medium">
					{#if (pageLocation.match(/\//gi) || []).length > 1 && history.length > 1}
						<button on:click={() => history.back()} class="hover:text-white">
							<ArrowLeftIcon class="w-5 h-5" />
						</button>
					{/if}
					<Pill className="w-full min-w-20 overflow-ellipsis overflow-x-hidden">
						<span class="relative inline-flex h-2 w-2 m-0 mr-2">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-salmon opacity-75"></span>
							<span class="relative inline-flex rounded-full h-2 w-2 bg-salmon"></span>
						</span>
						<span>{pageLocation}</span>
					</Pill>
					<span class="text-sm text-grey-200 inline-flex w-full justify-between">
						<span class="text-ellipsis">{pageDescription ? `$ ${pageDescription}` : ""}</span>
						<span>[{hours}:{minutes}:{seconds}]</span>
					</span>
				</span>
				<div class="name-body h-full">
					<slot />
				</div>
			</Card>
		</div>
	</div>
</main>
