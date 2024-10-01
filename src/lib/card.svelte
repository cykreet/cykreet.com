<script lang="ts">
	import clsx from "clsx";

	export let className = "";
	export let hoverEffects = false;
	let cardElement: HTMLElement;

	const cardClasses = clsx("card-background border-2 p-5 rounded-md relative shadow-sm", hoverEffects && "hoverCard", className);
	const mouseMove = (event: MouseEvent) => {
		if (!hoverEffects) return;
		const x = event.clientX - cardElement.getBoundingClientRect().left;
		const y = event.clientY - cardElement.getBoundingClientRect().top;
		cardElement.style.setProperty("--x", x.toString());
		cardElement.style.setProperty("--y", y.toString());
	};
</script>

<svelte:window on:mousemove={mouseMove} />

<div bind:this={cardElement} class={cardClasses}>
	<slot />
</div>

<style>
	* {
		border-color: hsl(0, 0%, 14.9%);
	}

	.card-background {
		background-color: hsl(0, 0%, 3.9%);
	}

	.hoverCard::before {
		z-index: -1;
		border-radius: inherit;
		background: radial-gradient(800px circle at calc(var(--x) * 1px) calc(var(--y) * 1px), rgb(232 62 39 / var(--tw-bg-opacity)), transparent 50%);
		content: "";
		top: -0.225rem;
		right: -0.225rem;
		bottom: -0.225rem;
		left: -0.225rem;
		position: absolute;
	}
</style>
