<script>
	import { ButtonStyle } from "./button/button";
	import Button from "./button/button.svelte";
	import Link from "./link.svelte";
	import Logo from "./logo.svelte";
</script>

<div class="flex flex-row justify-between mx-10 my-5 mb-0">
	<div class="font-bold text-white my-auto">
		<Link href="/"><Logo /></Link>
	</div>
	<div class="flex flex-row space-x-10 my-auto *:my-auto *:no-underline text-grey-100 text-sm">
		<Link href="/projects">Projects</Link>
		<Link href="/contact">
			<Button buttonStyle={ButtonStyle.Primary}>Contact</Button>
		</Link>
	</div>
</div>
