<script lang="ts">
	import { StarIcon } from "svelte-feather-icons";

	export let className: string;
</script>

<StarIcon class="fill-salmon text-salmon {className}" />
