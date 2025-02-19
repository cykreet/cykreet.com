<script lang="ts">
  import clsx from "clsx";
  import type { Snippet } from "svelte";

  interface Props {
    className?: string;
    decorated?: boolean;
    children: Snippet;
  }

  let { className, decorated, children }: Props = $props();
  const classNames = clsx(
    "text-sm font-medium inline-flex background items-center border-2 border-opacity-55 select-none bg-inherit/20 rounded-full max-w-fit px-3 py-1",
    decorated && "text-lavender border-lavender",
    className,
  );
</script>

<span class={classNames}>
  {@render children()}
</span>
