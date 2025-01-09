<script lang="ts">
	import { T } from "@threlte/core";
	import { interactivity } from "@threlte/extras";
	import { spring } from "svelte/motion";

	interactivity();

	const scale = spring(1);
	let rotationY = 0;
	let rotationX = 0;

	const mouseMove = (event: MouseEvent) => {
		// rotationX = event.clientY / 180;
		// rotationY = event.clientX / 180;
	};
</script>

<svelte:window on:mousemove={mouseMove} />

<T.PerspectiveCamera
	makeDefault
	position={[15, 2, 0]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
/>

<T.AmbientLight intensity={0.5} />

<T.DirectionalLight position={[0, 10, 10]} />

<T.Mesh rotation.y={rotationY} rotation.x={rotationX} position.y={1} scale={$scale} on:pointerenter={() => scale.set(1.5)} on:pointerleave={() => scale.set(1)}>
	<T.BoxGeometry args={[0.1, 8, 16]} />
	<T.MeshStandardMaterial color="hotpink" />
</T.Mesh>
