<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div class="min-w-full bg-[#131313] py-6 my-6 border-y border-y-[#414141]">
  <div class="container mx-auto space-y-3">
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    <slot />
  </div>
</div>
