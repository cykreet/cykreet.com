<script lang="ts">
  import HoverContainer from "$lib/hover/hover-container.svelte";
  import HoverFrame from "$lib/hover/hover-frame.svelte";
  import Link from "$lib/link.svelte";
  import IconMail from "virtual:icons/tabler/mail-filled";
  import IconEye from "virtual:icons/tabler/mountain-filled";
  import IconRosettte from "virtual:icons/tabler/rosette-filled";
  import "../app.css";
  import type { LayoutProps } from "./$types";

  let { children }: LayoutProps = $props();
</script>

<div class="mx-auto flex min-h-screen w-full xl:max-w-[50vw] relative">
  <aside class="w-2 bg-orange sm:w-2">
    <div class="flex flex-row gap-8 sticky top-0 z-10">
      <Link href="/" className="bg-orange flex">
        <div class="flex justify-center items-center h-15 w-15">
          <IconEye class="h-8 w-8" />
        </div>
      </Link>
      <HoverFrame className="w-fit">
        {#snippet hoverContainer()}
          <HoverContainer>Projects</HoverContainer>
        {/snippet}
        <Link href="/projects" className="bg-orange h-10 w-12 hover:h-15 transition flex items-center justify-center">
          <IconRosettte class="h-6 w-6" />
        </Link>
      </HoverFrame>
      <HoverFrame className="w-fit">
        {#snippet hoverContainer()}
          <HoverContainer>Contact</HoverContainer>
        {/snippet}
        <Link href="/contact" className="bg-orange h-10 w-12 hover:h-15 transition flex items-center justify-center">
          <IconMail class="h-6 w-6" />
        </Link>
      </HoverFrame>
    </div>
  </aside>

  <main class="min-w-0 flex-1">
    <div class="h-full">
      <div class="min-h-[100vh] flex flex-col space-y-6">
        <div class="h-full md:mx-auto md:max-w-180 px-4 mt-20 mb-20">
          {@render children()}
        </div>
      </div>
      <div class="bg-orange select-none text-background items-end flex h-50 p-4">
        <h2>cykreet.com</h2>
      </div>
    </div>
  </main>
</div>
