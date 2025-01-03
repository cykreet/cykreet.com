<script lang="ts">
	import { goto, preloadData } from "$app/navigation";
	import clsx from "clsx";

	export let href: string;
	export let title: string | undefined = undefined;
	export let className: string | undefined = undefined;

	const external = href.startsWith("http");
	const target = external ? "_blank" : "_self";
	const classNames = clsx("cursor-pointer", className);
</script>

{#if external === false}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<a
		{href}
		class={classNames}
		on:mouseover={async () => await preloadData(href)}
		on:click={(event) => {
			goto(href);
			event.preventDefault();
		}}
	>
		<slot />
	</a>
{:else}
	<a class={classNames} {target} {href} {title}>
		<slot />
	</a>
{/if}
