<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    className?: string;
    children: Snippet;
  }

  let { className, children }: Props = $props();
</script>

<span
  class="text-sm font-medium inline-flex background items-center border-2 border-salmon text-salmon border-opacity-55 select-none bg-inherit/20 rounded-full max-w-fit px-3 py-1 {className}"
>
  {@render children()}
</span>
