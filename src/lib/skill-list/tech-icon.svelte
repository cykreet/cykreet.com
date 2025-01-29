<script lang="ts">
  import HoverFrame from "$lib/hover/hover-frame.svelte";
  import { IconExternalLink } from "@tabler/icons-svelte";
  import clsx from "clsx";
  import Link from "../link.svelte";
  import type { TechnologyMeta } from "./skill";
  import HoverContainer from "../hover/hover-container.svelte";

  interface Props {
    name: string;
    meta: TechnologyMeta;
    className?: string;
  }

  let { name, meta, className }: Props = $props();
  let hovering = $state(false);

  const iconClasses = clsx("h-8 w-8 m-0 mx-auto stroke-1 stroke-grey-200");
  const containerClasses = clsx(
    "flex flex-col space-y-2 p-2 cursor-pointer group rounded-lg border-2 border-dashed border-grey",
    className,
  );
</script>

<HoverFrame bind:hovering>
  {#snippet hoverContainer()}
    <!-- 8-bit hexadecimal with 2 additional bits for opacity -->
    <HoverContainer style={`border-color: ${meta.colour}50;`}>
      <div class="flex flex-row gap-2 align-middle items-center font-bold" style={`color: ${meta.colour}`}>
        <meta.icon class="h-7 w-7 m-0 stroke-1" style={`stroke: ${meta.colour}`} />
        {name}
      </div>
      <span>{meta.description}</span>
      <Link
        href={meta.website ?? "#"}
        className="text-sm inline-flex items-center align-middle gap-2 opacity-75 hover:opacity-100"
        style={`color: ${meta.colour}`}
      >
        Learn more <IconExternalLink class="h-4 w-4" />
      </Link>
    </HoverContainer>
  {/snippet}
  <div class={containerClasses} style={`border-color: ${hovering ? meta.colour : ""}`}>
    <meta.icon class={iconClasses} style={`stroke: ${hovering ? meta.colour : ""}`} />
  </div>
</HoverFrame>
