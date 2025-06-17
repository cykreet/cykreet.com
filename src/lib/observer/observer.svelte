<script lang="ts">
  import vertexShader from "./vertex.glsl?raw";
  import fragmentShader from "./fragment.glsl?raw";
  import { T } from "@threlte/core";
  import { Text3DGeometry, interactivity } from "@threlte/extras";
  import { Spring } from "svelte/motion";
  import { Vector3 } from "three";
  import { onMount } from "svelte";

  const DAMPING_FACTOR = 0.3;
  const ROTATION_THRESHOLD = 0.2;

  let elapsed = $state(0.0);

  interactivity();
  const scale = new Spring(1);
  const position = new Vector3(2, 0, 6);
  const rotation = new Spring(
    { x: 0, y: 0, z: 0 },
    {
      stiffness: 0.1,
      damping: 1,
    },
  );

  onMount(() => {
    const animate = () => {
      requestAnimationFrame(animate);
      elapsed = performance.now() * 0.001;
    };

    animate();
  });

  const mouseMove = (event: MouseEvent) => {
    // -1 to 1
    const normalisedX = (event.clientX / window.innerWidth) * 2 - 1;
    const normalisedY = (event.clientY / window.innerHeight) * 2 - 1;
    let targetRotationHorizontal = normalisedX;
    let targetRotationVertical = normalisedY;

    if (Math.abs(normalisedX) > ROTATION_THRESHOLD) {
      const excess = Math.abs(normalisedX) - ROTATION_THRESHOLD;
      const dampedExcess = excess * DAMPING_FACTOR;
      targetRotationHorizontal =
        normalisedX > 0 ? ROTATION_THRESHOLD + dampedExcess : -ROTATION_THRESHOLD - dampedExcess;
    }

    if (Math.abs(normalisedY) > ROTATION_THRESHOLD) {
      const excess = Math.abs(normalisedY) - ROTATION_THRESHOLD;
      const dampedExcess = excess * DAMPING_FACTOR;
      targetRotationVertical = normalisedY > 0 ? ROTATION_THRESHOLD + dampedExcess : -ROTATION_THRESHOLD - dampedExcess;
    }

    rotation.set({ x: 0, y: targetRotationHorizontal, z: -targetRotationVertical });
  };
</script>

<svelte:window onmousemove={mouseMove} />

<T.AxesHelper />

<T.PerspectiveCamera
  makeDefault
  position={[20, 10, 0]}
  oncreate={(instance) => {
    instance.lookAt(position.x, instance.position.y, position.z);
  }}
/>

<T.AmbientLight intensity={0.2} />

<T.DirectionalLight color="#ffffff" intensity={1.0} />

<T.Group
  position.y={1}
  rotation={[rotation.current.x, rotation.current.y, rotation.current.z]}
  scale={scale.current}
  on:pointerenter={() => scale.set(1.2)}
  on:pointerleave={() => scale.set(1)}
>
  <T.Mesh rotation={[0, Math.PI / 2, 0]} position={[position.x, position.y, position.z]}>
    <Text3DGeometry size={14} rotation={[0, Math.PI / 2, 0]} bevelSize={2} depth={2} text="*" />
    <T.ShaderMaterial
      {vertexShader}
      {fragmentShader}
      uniforms={{ time: { value: 0.0 } }}
      uniforms.time.value={elapsed}
    />
  </T.Mesh>
</T.Group>
