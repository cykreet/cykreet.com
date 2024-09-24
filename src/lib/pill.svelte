<script lang="ts">
	export let className: string = "";
</script>

<span
	class="text-sm font-medium inline-flex background items-center border-2 border-salmon text-salmon border-opacity-55 select-none bg-opacity-20 rounded-full max-w-fit min-w-20 px-3 py-1 {className}"
	><slot /></span
>
