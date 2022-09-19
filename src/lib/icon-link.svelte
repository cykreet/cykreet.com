<script lang="ts">
  import type { IconClass } from 'svelte-feather-icons';
  import Link from './link.svelte';

  export let href: string;
  export let title: string | undefined;
  export let icon: typeof IconClass;
</script>

<Link classNames="text-salmon hover:text-salmon-50" {href} {title}>
  <svelte:component this={icon} class="w-4 h-4" />
</Link>
