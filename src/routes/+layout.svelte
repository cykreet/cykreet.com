<script lang="ts">
	import "../app.css";
	import Card from "$lib/card.svelte";
	import Header from "$lib/header.svelte";
	import { page } from "$app/stores";
	import Pill from "$lib/pill.svelte";
	import Logo from "$lib/logo.svelte";
	import clsx from "clsx";
	import { pageContext } from "../store";
	import { onMount } from "svelte";

	let currentTime = new Date();
	let pageLocation: string;
	let homeCardClasses: string;
	let pageDescription: string;

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
				<span class="inline-flex items-center space-x-6 text-salmon">
					<h1 class="text-inherit">welcome to my corner</h1>
					<Logo className="animate-[spin_3s_linear_infinite] w-10 h-10" />
				</span>
			</Card>
			<div class="flex flex-row space-x-10 h-1/2">
				<Card className="w-full">box one</Card>
				<Card className="w-full">box two</Card>
			</div>
		</div>
		<Card className="flex flex-col md:w-4/12 space-y-4">
			<span class="inline-flex items-center space-x-4">
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
