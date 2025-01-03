<script lang="ts">
	import { pageContext } from "../store";
	import { page } from "$app/stores";

	pageContext.set("something went wrong");
</script>

<div class="flex flex-col w-full h-96 align-middle justify-center text-center">
	<h1>{$page.status}</h1>
	<span>nice, you broke it.</span>
</div>
