<script lang="ts">
	export let className: string;
</script>

<div class="border border-grey-300 p-5 rounded-md {className}">
	<slot />
</div>
