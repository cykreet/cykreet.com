<script lang="ts">
  export let href: string;
  export let title: string | undefined;
  export let classNames: string | undefined;
</script>

<a class={classNames} {href} {title} target="_blank">
  <slot />
</a>
