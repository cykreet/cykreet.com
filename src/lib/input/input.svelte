<script lang="ts">
	import clsx from "clsx";

	export let placeholder = "";
	export let type = "text";
	export let title = "";
	export let required = false;
	export let inputClassName = "";

	const inputClassNames = clsx(
		"w-full bg-transparent outline-none text-white text-wrap border-grey-300 align-text-top border-2 p-2 max-w-full rounded-md text-sm focus:border-salmon",
		inputClassName
	);
</script>

<div class="flex flex-col space-y-1">
	<span class="text-white">{title}</span>
	<input class={inputClassNames} {required} {type} {placeholder} />
</div>
