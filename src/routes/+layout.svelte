<script lang="ts">
	import { page } from "$app/stores";
	import Card from "$lib/card.svelte";
	import Header from "$lib/header.svelte";
	import Pill from "$lib/pill.svelte";
	import clsx from "clsx";
	import { onMount } from "svelte";
	import "../app.css";
	import EventList from "../lib/event-list/event-list.svelte";
	import TimeIcon from "../lib/time-icon.svelte";
	import { pageContext } from "../store";
	import type { LayoutData } from "./$types";

	let currentTime = new Date();
	let pageLocation: string;
	let homeCardClasses: string;
	let pageDescription: string;

	export let data: LayoutData;

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
		return () => clearInterval(timeInterval);
	});
</script>

<main>
	<Header />
	<div class="flex flex-col md:flex-row w-full p-10 space-x-10 h-[90vh]">
		<div class="md:w-8/12 space-y-10 flex flex-col">
			<Card className={homeCardClasses}>
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
			<div class="flex flex-row space-x-10 h-1/2">
				<Card className="w-full">
					<EventList events={data.events} />
				</Card>
				<Card className="w-full">box two</Card>
			</div>
		</div>
		<Card className="flex flex-col md:w-4/12 space-y-6 card-gradient">
			<span class="inline-flex items-center space-x-4 font-medium">
				<Pill className="w-full">
					<span class="relative inline-flex h-2 w-2 m-0 mr-2">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-salmon opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2 w-2 bg-salmon"></span>
					</span>
					{pageLocation}
				</Pill>
				<span class="text-sm opacity-70 inline-flex w-full justify-between">
					<span>$ {pageDescription ?? "..."}</span>
					<span>[{hours}:{minutes}:{seconds}]</span>
				</span>
			</span>
			<div class="overflow-y-auto h-full">
				<slot />
			</div>
		</Card>
	</div>
</main>
