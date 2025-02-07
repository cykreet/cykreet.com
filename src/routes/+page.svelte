<script lang="ts">
  // import Link from "../lib/link.svelte";
  import { pageContext } from "../store";

  pageContext.set("a little about me");
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="flex flex-col space-y-4">
  <!-- <h3>Full-stack</h3> -->
  <p>some things are still broken/missing, bear with me :)</p>
  <!-- <p>
    When I'm not messing around with programming, I like to write/produce electronic music with
    <Link decorated href="https://www.ableton.com/en/live/">Ableton Live</Link>.
  </p> -->
</div>
