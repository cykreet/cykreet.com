<script lang="ts">
	import Link from "../link.svelte";
	import type { SpotifyRecentArtists } from "../server/artists";

	export let artists: SpotifyRecentArtists[];
</script>

<div class="grid grid-flow-row grid-cols-4 gap-4">
	{#each artists as artist}
		<Link href={artist.url} className="flex flex-col hover:-translate-y-1 border-b-4 transition space-y-2 p-2 rounded-lg border-2 border-grey">
			<img src={artist.image.url} alt={artist.name} class="rounded-md h-[6.5rem] object-cover" />
			<span class="font-medium overflow-x-hidden text-ellipsis whitespace-nowrap">{artist.name}</span>
		</Link>
	{/each}
</div>
