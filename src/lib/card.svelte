<script lang="ts">
  import clsx from "clsx";
  import HoverFrame from "./hover/hover-frame.svelte";
  import HoverContainer from "./hover/hover-container.svelte";
  import type { Component, Snippet } from "svelte";

  interface Props {
    children: Snippet;
    cardClassName?: string;
    className?: string;
    style?: string;
    cardTitle?: string;
    tooltip?: string;
    hoverEffects?: boolean;
    Icon?: Component;
    // loading?: boolean;
  }

  let { cardClassName, className, children, style, cardTitle, tooltip, hoverEffects, Icon }: Props = $props();
  let cardElement: HTMLElement;
  let hasScrolled = $state(false);
  let hoveringTop = $state(false);

  const cardClasses = clsx(
    "card-background border-2 rounded-md relative shadow",
    hoverEffects && "hoverCard",
    cardClassName,
  );
  const classNames = clsx("p-5 overflow-y-auto items-stretch h-full", className);
  const mouseMove = (event: MouseEvent) => {
    if (!hoverEffects) return;
    const x = event.clientX - cardElement.getBoundingClientRect().left;
    const y = event.clientY - cardElement.getBoundingClientRect().top;
    const withinBoundary = x > 0 && x < cardElement.offsetWidth && y > 0 && y < cardElement.offsetHeight;
    if (withinBoundary) hoveringTop = event.clientY < cardElement.getBoundingClientRect().top + 100;
    else hoveringTop = false;

    // if (hoveringTop) console.log("hovering top");
    cardElement.style.setProperty("--x", x.toString());
    cardElement.style.setProperty("--y", y.toString());
  };

  const elementScroll = (event: UIEvent) => {
    if (event.target == null) return;
    const element = event.target as Element;
    hasScrolled = element.scrollTop > 0;
  };
</script>

<svelte:window on:mousemove={mouseMove} />

<div bind:this={cardElement} class={cardClasses} {style}>
  <div class="overflow-hidden flex max-h-full flex-col">
    {#if cardTitle}
      <HoverFrame className="w-fit z-30">
        {#snippet hoverContainer()}
          <HoverContainer>
            {tooltip}
          </HoverContainer>
        {/snippet}
        <span class="px-5 text-sm text-grey-200 font-medium z-20 select-none align inline-flex gap-2 mt-1 items-center">
          {#if Icon != null}
            <Icon class="w-4 h-4" />
          {/if}
          {cardTitle}
        </span>
      </HoverFrame>
      <hr class="border-[1.5px]" />
    {/if}
    {#if hasScrolled && hoveringTop === false}
      <div
        class="absolute w-full animate-fade ![animation-delay:0s] ![animation-duration:0.2s] bg-gradient-to-b from-background to-40% h-full pointer-events-none z-10"
      ></div>
    {/if}
    <div onscroll={elementScroll} class={classNames}>
      {@render children()}
    </div>
  </div>
</div>

<style>
  * {
    border-color: hsl(0, 0%, 14.9%);
  }

  .card-background {
    background-color: hsl(0, 0%, 3.9%);
  }

  .hoverCard::before {
    z-index: -1;
    border-radius: inherit;
    background: radial-gradient(
      800px circle at calc(var(--x) * 1px) calc(var(--y) * 1px),
      rgb(232 62 39 / var(--tw-bg-opacity)),
      transparent 50%
    );
    content: "";
    top: -0.225rem;
    right: -0.225rem;
    bottom: -0.225rem;
    left: -0.225rem;
    position: absolute;
  }
</style>
