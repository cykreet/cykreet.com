<script lang="ts">
  import { HoverFrameContext, type HoverFrame } from "./hover.ts";
  import { clsx } from "clsx";
  import { getContext, hasContext, type Snippet } from "svelte";

  const HEIGHT_EXCESS_MARGIN = 10;

  if (!hasContext(HoverFrameContext)) throw new Error("HoverContainer must be used within a HoverFrame");

  let { className, children, style }: { className?: string; children: Snippet; style?: string } = $props();
  let containerElement: HTMLElement;
  const classNames = clsx(
    "fixed z-20 p-4 flex flex-col space-y-3 min-w-72 bg-background text-sm border-2 border-b-4 border-grey animate-slide-bottom max-w-80 rounded-md shadow-md",
    className,
  );

  const hoverFrame = getContext(HoverFrameContext) as HoverFrame;
  const targetContainer = hoverFrame.targetContainer;

  $effect(() => {
    if (targetContainer == null) return;
    const containerHeight = containerElement.offsetHeight;
    const containerWidth = containerElement.offsetWidth;

    const bottomExcess = Math.max(
      0,
      targetContainer.getBoundingClientRect().top + (containerHeight + HEIGHT_EXCESS_MARGIN) - window.innerHeight,
    );
    const rightExcess = Math.max(0, targetContainer.getBoundingClientRect().right + containerWidth - window.innerWidth);

    // if the hover container overflows to the right of the page, display it on the left
    // side of the hover trigger element
    const x =
      targetContainer.getBoundingClientRect().x + (rightExcess > 0 ? -containerWidth : targetContainer.offsetWidth);
    // if the hover container overflows beyond the bottom of the window, move it up
    // by the amount it overflows
    const y = targetContainer.getBoundingClientRect().y - bottomExcess;
    containerElement.style.left = `${x}px`;
    containerElement.style.top = `${y}px`;
  });
</script>

<div class={classNames} {style} bind:this={containerElement}>
  {@render children()}
</div>
