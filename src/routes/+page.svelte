<script lang="ts">
  import Link from "$lib/link.svelte";
  import { pageContext } from "../store";

  pageContext.set("a little about me");
</script>

<svelte:head>
  <title>what's here</title>
</svelte:head>

<div class="card-glow"></div>
<div class="flex flex-col space-y-4">
  <div class="max-w-lg space-y-4">
    <h1 class="text-orange">
      <span>what's here</span>
    </h1>
    <p>
      I'm a software engineer from South Africa interested in exploring performance-oriented programming. I also enjoy
      visual design work. Currently working on an <Link href="/projects/ir" decorated>audio plugin</Link> and research related
      to data-oriented narrative architectures in games.
    </p>
  </div>
</div>
