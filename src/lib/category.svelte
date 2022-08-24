<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div class="py-6 my-6 container mx-auto space-y-3">
  <div>
    <h2>{title}</h2>
    {description}
  </div>
  <slot />
</div>
