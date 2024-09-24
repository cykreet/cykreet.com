<script lang="ts">
	export let className: string = "";
</script>

<div class="border-2 border-grey-300 p-5 rounded-md {className}">
	<slot />
</div>
