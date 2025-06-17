varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  vUv = uv;
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectedPosition;
}