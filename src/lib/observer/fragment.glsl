// originally created by @diatribes
// https://www.shadertoy.com/view/wftGRS
// the original shader has been butchered a bit to work (somewhat) with text geometry uvs
// and the end result is pretty interesting

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vModelPosition;
uniform float time;

void main() {
  float rayStep = 0.0, rayDistance = 0.0, density = 0.0, time = time * 1e2;
  vec4 colour = vec4(0.0);

  vec2 rayOrigin = vPosition.xy * 0.1;
  rayOrigin += vPosition.z * 0.1;
  rayOrigin += vec2(sin(time * 0.003), cos(time * 0.001)) * 1.0;

  // vec2 uvCoord = (vUv - 0.5) * 8.0;
  // vec2 polarCoord = vec2(atan(vPosition.y, vPosition.x), length(vPosition.xy)) * 2.0;
  // vec2 rayOrigin = uvCoord * 0.3 + polarCoord * 0.1;
  // rayOrigin += vec2(sin(time * 0.005), cos(time * 0.007)) * 2.0;
  
  // float rotation = time * 0.01;
  // mat2 rotMatrix = mat2(cos(rotation), -sin(rotation), sin(rotation), cos(rotation));
  // rayOrigin = rotMatrix * rayOrigin;
 
  for (colour *= rayStep; rayStep < 1e2; rayStep++) {
    vec3 rayPos = vec3(rayOrigin * rayDistance, rayDistance + time);
    rayPos.x += sin(vPosition.z * 0.03) * 8.0;
    density = -30.0 + rayPos.y + sin(rayPos.z * 0.01) * 32.0 + abs(rayPos.x * 0.08) * 9.0;
    for (float amp = 0.05; amp < 4.0; amp *= 1.4) {
      density += abs(dot(sin(vPosition * amp), vec3(0.1))) / amp;
    }
    
    rayDistance += density = 0.03 + abs(density) * 0.2;
    colour += vec4(6.0, 2.0, 5.0, 0.0) / density;
  }
  
  colour = tanh(colour / 2e3);
  gl_FragColor = vec4(colour.rgb, 1.0);
}