<script lang="ts">
	import clsx from "clsx";

	export let cardClassName = "";
	export let className = "";
	export let cardTitle = "";
	export let hoverEffects = false;
	export let icon: ConstructorOfATypedSvelteComponent | null = null;
	// export let loading = false;

	let cardElement: HTMLElement;
	let hasScrolled = false;
	let hoveringTop = false;

	const cardClasses = clsx("card-background border-2 rounded-md relative shadow-sm", hoverEffects && "hoverCard", cardClassName);
	const classNames = clsx("p-5 overflow-y-auto items-stretch h-full", className);
	const mouseMove = (event: MouseEvent) => {
		if (!hoverEffects) return;
		const x = event.clientX - cardElement.getBoundingClientRect().left;
		const y = event.clientY - cardElement.getBoundingClientRect().top;
		const withinBoundary = x > 0 && x < cardElement.offsetWidth && y > 0 && y < cardElement.offsetHeight;
		if (withinBoundary) hoveringTop = event.clientY < cardElement.getBoundingClientRect().top + 100;
		else hoveringTop = false;

		cardElement.style.setProperty("--x", x.toString());
		cardElement.style.setProperty("--y", y.toString());
	};

	const elementScroll = (event: UIEvent) => {
		if (event.target == null) return;
		const element = event.target as Element;
		hasScrolled = element.scrollTop > 0;
	};
</script>

<svelte:window on:mousemove={mouseMove} />

<div bind:this={cardElement} class={cardClasses}>
	<div class="overflow-hidden flex max-h-full flex-col">
		{#if cardTitle}
			<span class="px-5 text-sm text-grey-200 font-medium select-none z-20 inline-flex gap-2 items-center">
				{#if icon}
					<svelte:component this={icon} class="w-4 h-4" />
				{/if}
				{cardTitle}
			</span>
			<hr class="border-[1.5px] z-20" />
		{/if}
		{#if hasScrolled && hoveringTop == false}
			<div class="absolute w-full animate-fade ![animation-delay:0s] ![animation-duration:0.2s] bg-gradient-to-b from-background to-40% h-full pointer-events-none z-10" />
		{/if}
		<div on:scroll={elementScroll} class={classNames}>
			<slot />
		</div>
	</div>
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
