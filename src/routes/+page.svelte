<script lang="ts">
  import Link from "../lib/link.svelte";
  import { pageContext } from "../store";

  pageContext.set("a little about me");
</script>

<svelte:head>
  <title>what's here</title>
</svelte:head>

<div class="flex flex-col space-y-4">
  <h1 class="text-white">what's here</h1>
  <p>
    This is my personal website where I'd like to share my projects and thoughts. Shouldn't have to look too far to my
    find my <Link decorated href="/projects">projects</Link> and <Link decorated href="/contact">contact details</Link>.
  </p>
  <p>more soon.</p>
</div>
