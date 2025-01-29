<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import { HoverFrameContext, type HoverFrame } from "./hover";

  interface Props {
    hoverContainer: Snippet;
    children: Snippet;
    hovering?: boolean;
    className?: string;
  }

  let { hoverContainer, children, hovering = $bindable(), className }: Props = $props();
  let targetContainer: HTMLElement | null = null;
  const onMouseEnter = async (event: (MouseEvent | FocusEvent) & { currentTarget: HTMLElement }) => {
    if (!event.currentTarget) return;
    hovering = true;
  };

  const onMouseLeave = (event: (MouseEvent | FocusEvent) & { currentTarget: HTMLElement }) => {
    hovering = false;
  };

  $effect(() => {
    setContext(HoverFrameContext, {
      targetContainer,
    }) satisfies HoverFrame;
  });
</script>

<div
  bind:this={targetContainer}
  role="tooltip"
  onmouseenter={onMouseEnter}
  onfocus={onMouseEnter}
  onmouseleave={onMouseLeave}
  onblur={onMouseLeave}
  class={className}
>
  {#if hovering}
    {@render hoverContainer()}
  {/if}
  {@render children()}
</div>
