<script lang="ts">
  import clsx from "clsx";
  import type { Snippet } from "svelte";

  interface Props {
    href: string;
    children: Snippet;
    title?: string;
    decorated?: boolean;
    className?: string;
    style?: string;
  }

  let { href, title, children, decorated, className, style }: Props = $props();

  const external = href.startsWith("http");
  const target = external ? "_blank" : undefined;
  const classNames = clsx("cursor-pointer", decorated && "text-salmon hover:text-salmon-50", className);
</script>

<a class={classNames} {target} {href} {title} {style}>
  {@render children()}
</a>
