<script lang="ts">
	export let href: string;
	export let title: string | undefined;
	export let className: string | undefined;
</script>

<a class="cursor-pointer {className}" {href} {title}>
	<slot />
</a>
