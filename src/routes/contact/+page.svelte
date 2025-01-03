<script lang="ts">
	import { TwitterIcon } from "svelte-feather-icons";
	import Link from "../../lib/link.svelte";
	import { pageContext } from "../../store";
	// import Input from "../../lib/input/input.svelte";

	pageContext.set("let's get in touch");
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<div class="flex flex-col space-y-5">
	<div class="inline-flex items-center space-x-4">
		<h2>check back soon.</h2>
		<Link className="hover:text-salmon w-fit" href="https://twitter.com/cykreet">
			<TwitterIcon class="w-5 h-5" />
		</Link>
	</div>
	<!-- <Input required title="Name" placeholder="Enter your name" /> -->
	<!-- <Input required title="Email" type="email" placeholder="Enter your email" /> -->
	<!-- <Input required inputClassName="h-40" title="Message" placeholder="Enter your message" /> -->
</div>
