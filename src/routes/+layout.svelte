<script lang="ts">
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
	import Link from "../lib/link.svelte";
	import TimeIcon from "../lib/time-icon.svelte";
	import { pageContext } from "../store";
	import type { LayoutData } from "./$types";
	import { onNavigate } from "$app/navigation";

	export let data: LayoutData;

	let currentTime = new Date();
	let pageLocation: string;
	let homeCardClasses: string;
	let pageDescription: string;
	let backPath: string;

	$: hours = currentTime.getHours().toString().padStart(2, "0");
	$: minutes = currentTime.getMinutes().toString().padStart(2, "0");
	$: seconds = currentTime.getSeconds().toString().padStart(2, "0");

	$: {
		pageLocation = $page.url.pathname;
		homeCardClasses = clsx("w-full h-1/2", pageLocation === "/" ? "block" : "hidden md:block");
		pageDescription = $pageContext;
	}

	onMount(() => {
		const timeInterval = setInterval(() => (currentTime = new Date()), 1000);
		backPath = document.referrer.split(location.origin)[1]! ?? pageLocation.split("/").slice(0, -1).join("/");
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
			<div class="md:w-8/12 space-y-5 flex flex-col">
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
				<div class="flex flex-col md:flex-row md:space-x-5 md:space-y-0 space-y-5 h-1/2">
					<Card cardClassName="w-full" cardTitle="Recent Commits" hoverEffects>
						<EventList events={data.events} />
					</Card>
					<Card cardClassName="w-full" cardTitle="Listening Activity" hoverEffects>
						<ArtistsList artists={data.artists} />
					</Card>
				</div>
			</div>
			<Card cardClassName="md:w-4/12 card-gradient" className="flex flex-col space-y-6">
				<span class="animate-top inline-flex items-center space-x-4 font-medium">
					{#if (pageLocation.match(/\//gi) || []).length > 1 && backPath}
						<Link href={backPath} className="hover:text-white">
							<ArrowLeftIcon class="w-5 h-5" />
						</Link>
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
				<div class="animate-fade h-full">
					<slot />
				</div>
			</Card>
		</div>
	</div>
</main>
