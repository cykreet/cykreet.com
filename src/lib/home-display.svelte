<script lang="ts">
  import { T } from "@threlte/core";
  import { interactivity } from "@threlte/extras";
  import { Spring } from "svelte/motion";

  const DAMPING_FACTOR = 0.3;
  const ROTATION_THRESHOLD = 0.5;
  const HEIGHT_OFFSET = 200;

  interactivity();
  // const scale = new Spring(1);
  const rotation = new Spring(
    { x: 0, y: 0, z: 0 },
    {
      stiffness: 0.1,
      damping: 1,
    },
  );

  function mouseMove(event: MouseEvent) {
    // -1 to 1
    const normalisedX = (event.clientX / window.innerWidth) * 2 - 1;
    const normalisedY = ((event.clientY + HEIGHT_OFFSET) / window.innerHeight) * 2 - 1;
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
  }
</script>

<svelte:window onmousemove={mouseMove} />

<T.PerspectiveCamera
  makeDefault
  position={[20, 40, 0]}
  oncreate={(instance) => {
    instance.lookAt(0, 1, 0);
  }}
/>

<!-- <T.AmbientLight intensity={0.8} /> -->
