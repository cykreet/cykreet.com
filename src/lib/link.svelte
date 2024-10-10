<script lang="ts">
	import clsx from "clsx";

	export let href: string;
	export let external = false;
	export let title: string | undefined = undefined;
	export let className: string | undefined = undefined;

	const target = external ? "_blank" : "_self";
	const classNames = clsx("cursor-pointer", className);
</script>

<a class={classNames} {target} {href} {title}>
	<slot />
</a>
