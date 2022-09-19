<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div class="flex flex-col p-6 gap-2 my-6 container mx-auto space-y-3">
  <div>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
  <div>
    <slot />
  </div>
</div>
