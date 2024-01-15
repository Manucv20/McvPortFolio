import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

// Vertex Shader for Opening Effect
const vertexShader = `
  uniform float time;
  varying vec3 vNormal;
  void main() {
    vNormal = normal;
    float opening = sin(time) * 0.5 + 0.5; // Oscillates between 0 and 1
    vec3 expandedPosition = position + normal * opening * 0.5; // Expand along the normal
    gl_Position = projectionMatrix * modelViewMatrix * vec4(expandedPosition, 1.0);
  }
`;

// Simplified Fragment Shader
const fragmentShader = `
  varying vec3 vNormal;
  void main() {
    gl_FragColor = vec4(abs(vNormal), 1.0); // Color based on normal
  }
`;

// Define a custom shader material
const CubeShaderMaterial = shaderMaterial(
  { time: 0.0 },
  vertexShader,
  fragmentShader
);

extend({ CubeShaderMaterial });

const InteractiveCube = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    // Update shader uniform for time
    meshRef.current.material.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[4, 4, 4]} />
      <cubeShaderMaterial />
    </mesh>
  );
};

export default InteractiveCube;
