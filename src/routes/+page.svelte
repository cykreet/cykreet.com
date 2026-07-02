<script lang="ts">
  import TimeIcon from "$lib/time-icon.svelte";
  import Link from "../lib/link.svelte";
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
      <span>welcome to my</span>
      <span class="inline-flex items-center space-x-4">
        <span>corner</span>
        <TimeIcon className="w-10 h-10" />
      </span>
    </h1>
    <p>
      This is my personal website where I'd like to share my projects and thoughts. Shouldn't have to look too far to my
      find my <Link decorated href="/projects">projects</Link> and <Link decorated href="/contact">contact details</Link
      >.
    </p>
  </div>
  <p>more soon.</p>
</div>
