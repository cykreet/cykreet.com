<script lang="ts">
	import clsx from "clsx";
	import { IconSun } from "@tabler/icons-svelte";

	export let className = "";
	const hour = new Date().getHours();
	const iconClass = clsx("text-salmon fill-salmon", className);
</script>

{#if hour >= 6 && hour < 18}
	<IconSun class="animate-[spin_5s_linear_infinite] {iconClass}" />
{:else}
	<div class="orbit-container">
		<div class="earth"></div>
		<div class="moon"></div>
	</div>
{/if}

<style>
	.orbit-container {
		position: relative;
		width: 100px;
		height: 75px;
	}

	.earth {
		@apply bg-salmon;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.moon {
		@apply bg-salmon;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: orbit 5s linear infinite;
	}

	@keyframes orbit {
		0% {
			transform: translate(-50%, -50%) rotate(0deg) translateX(35px) rotate(0deg);
		}
		100% {
			transform: translate(-50%, -50%) rotate(360deg) translateX(35px) rotate(-360deg);
		}
	}
</style>
