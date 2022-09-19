<script lang="ts">
  export let isOpen: boolean;
  export let onClose: () => void;

  function onClickOutside(node: Node) {
    function onClick(event: MouseEvent) {
      if (isOpen && !node.contains(event.target as Node)) onClose();
    }

    document.body.addEventListener('click', onClick, true);
    return {
      destroy() {
        document.body.removeEventListener('click', onClick, true);
      },
    };
  }
</script>

<svelte:head>
  {#if isOpen}
    <style>
      body {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

{#if isOpen}
  <div class="flex items-center justify-center modal-open fixed inset-0 z-50 bg-background/75">
    <div use:onClickOutside class="relative rounded-lg border border-grey bg-grey-700 max-w-sm">
      <slot />
    </div>
  </div>
{/if}
