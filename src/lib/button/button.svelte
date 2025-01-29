<script lang="ts">
  import type { Snippet } from "svelte";
  import Loader from "../loader.svelte";
  import { ButtonStyle } from "./button";

  interface Props {
    children: Snippet;
    className?: string;
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    buttonStyle?: ButtonStyle;
  }

  let { className, children, type = "button", loading = false, buttonStyle = ButtonStyle.Secondary }: Props = $props();
</script>

<button
  {type}
  class="transition duration-75 rounded-md border-2 px-3 py-1 cursor-pointer select-none {buttonStyle} {className}"
>
  {#if loading}
    <Loader />
  {:else}
    {@render children()}
  {/if}
</button>
