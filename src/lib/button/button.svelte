<script lang="ts">
  import Loader from "../loader.svelte";
  import { ButtonStyle } from "./button";

  export let className = "";
  export let type: "button" | "submit" | "reset" = "button";
  export let loading = false;
  export let buttonStyle: ButtonStyle = ButtonStyle.Secondary;
</script>

<button
  {type}
  class="transition duration-75 rounded-md border-2 px-3 py-1 cursor-pointer select-none {buttonStyle} {className}"
>
  {#if loading}
    <Loader />
  {:else}
    <slot />
  {/if}
</button>
