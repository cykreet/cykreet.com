<script lang="ts">
  import clsx from "clsx";

  export let href: string;
  export let title: string | undefined = undefined;
  export let decorated: boolean | undefined = false;
  export let className: string | undefined = undefined;

  const external = href.startsWith("http");
  const target = external ? "_blank" : undefined;
  const classNames = clsx("cursor-pointer", decorated && "text-salmon hover:text-salmon-50", className);
</script>

<a class={classNames} {target} {href} {title}>
  <slot />
</a>
