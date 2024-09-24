<script>
	import { ButtonStyle } from "./button/button";
	import Button from "./button/button.svelte";
	import Link from "./link.svelte";
</script>

<div class="flex flex-row justify-between mx-10 my-5 mb-0">
	<div class="font-bold text-white my-auto">
		<Link className="transition hover:-translate-y-1 rounded-full bg-salmon text-background inline-flex items-center px-2 space-x-3" href="/">
			<span class="rounded-full h-2 w-2 bg-background"></span>
			<span>cykreet</span>
		</Link>
	</div>
	<div class="flex flex-row space-x-10 my-auto font-medium *:my-auto *:no-underline text-grey-100 text-sm">
		<Link href="/projects">Projects</Link>
		<Link href="/contact">
			<Button buttonStyle={ButtonStyle.Primary}>Contact</Button>
		</Link>
	</div>
</div>
