<script lang="ts">
	import { page } from "$app/stores";
	import Card from "$lib/card.svelte";
	import Header from "$lib/header.svelte";
	import Pill from "$lib/pill.svelte";
	import clsx from "clsx";
	import { onMount } from "svelte";
	import "../app.css";
	import { ArrowLeftIcon } from "svelte-feather-icons";
	import EventList from "../lib/event-list/event-list.svelte";
	import TimeIcon from "../lib/time-icon.svelte";
	import { pageContext } from "../store";
	import type { LayoutData } from "./$types";
	import { goto, preloadData } from "$app/navigation";

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
		backPath = document.referrer.split(location.origin)[1]!;
		return () => clearInterval(timeInterval);
	});
</script>

<main>
	<div class="mx-10">
		<Header />
		<div class="mt-4 flex flex-col md:flex-row w-full space-x-5 h-[90vh]">
			<div class="md:w-8/12 space-y-5 flex flex-col">
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
				<div class="flex flex-row space-x-5 h-1/2">
					<Card className="w-full" hoverEffects>
						<EventList events={data.events} />
					</Card>
					<Card className="w-full" hoverEffects>box two</Card>
				</div>
			</div>
			<Card className="flex flex-col md:w-4/12 space-y-6 card-gradient">
				<span class="animate-top inline-flex items-center space-x-4 font-medium">
					{#if backPath && (pageLocation.match(/\//gi) || []).length > 1}
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-mouse-events-have-key-events -->
						<div class="hover:text-white cursor-pointer" on:mouseover={async () => await preloadData(backPath)} on:click={() => goto(backPath)}>
							<ArrowLeftIcon class="w-5 h-5" />
						</div>
					{/if}
					<Pill className="w-full min-w-20 overflow-ellipsis overflow-x-hidden">
						<span class="relative inline-flex h-2 w-2 m-0 mr-2">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-salmon opacity-75"></span>
							<span class="relative inline-flex rounded-full h-2 w-2 bg-salmon"></span>
						</span>
						<span>{pageLocation}</span>
					</Pill>
					<span class="text-sm text-grey-200 inline-flex w-full justify-between">
						<span class="text-ellipsis">$ {pageDescription ?? "..."}</span>
						<span>[{hours}:{minutes}:{seconds}]</span>
					</span>
				</span>
				<div class="animate-fade overflow-y-auto h-full">
					<slot />
				</div>
			</Card>
		</div>
	</div>
</main>

<style>
	.animate-top {
		animation-duration: 0.55s;
		animation-delay: 0.5s;
		animation-name: animate-top;
		animation-fill-mode: backwards;
	}

	@keyframes animate-top {
		0% {
			opacity: 0;
			transform: translateY(-50%);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade {
		animation-duration: 0.5s;
		animation-name: animate-fade;
		animation-delay: 0.5s;
		animation-fill-mode: backwards;
	}

	@keyframes animate-fade {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
