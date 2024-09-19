<script>
	import "../app.css";
	import Card from "$lib/card.svelte";
	import Header from "$lib/header.svelte";
	import { page } from "$app/stores";
	import Pill from "$lib/pill.svelte";

	const pageHost = $page.url.host;
	const pageLocation = $page.url.pathname;
</script>

<main>
	<Header />
	<div class="flex flex-row w-full p-10 space-x-10 h-[90vh]">
		<div class="w-8/12 space-y-10 flex flex-col">
			<Card className="w-full h-1/2">
				<h2>welcome</h2>
			</Card>
			<div class="flex flex-row space-x-10 h-1/2">
				<Card className="w-full">box one</Card>
				<Card className="w-full">box two</Card>
			</div>
		</div>
		<Card className="flex flex-col w-4/12 space-y-4">
			<Pill>
				<span class="relative inline-flex h-2 w-2 m-0 mr-2">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-salmon opacity-75"></span>
					<span class="relative inline-flex rounded-full h-2 w-2 bg-salmon"></span>
				</span>
				{pageLocation}
			</Pill>
			<div class="overflow-y-auto h-full">
				<slot />
			</div>
		</Card>
	</div>
</main>
