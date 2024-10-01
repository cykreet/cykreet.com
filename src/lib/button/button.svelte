<script lang="ts">
	import { ButtonStyle } from "./button";

	export let className = "";
	export let buttonStyle: ButtonStyle = ButtonStyle.Secondary;
</script>

<div class="transition duration-75 rounded-md border px-3 py-1 cursor-pointer select-none {buttonStyle} {className}"><slot /></div>
