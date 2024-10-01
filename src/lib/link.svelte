<script lang="ts">
	export let href: string;
	export let external = false;
	export let title: string | undefined = undefined;
	export let className: string | undefined = undefined;

	const target = external ? "_blank" : "_self";
</script>

<a class="cursor-pointer hover:text-white {className}" {target} {href} {title}>
	<slot />
</a>
