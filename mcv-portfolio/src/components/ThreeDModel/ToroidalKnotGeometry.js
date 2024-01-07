import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';

const ToroidalKnotGeometry = () => {
  // Ajustar los parámetros para reducir el tamaño del nudo toroidal
  const geom = new THREE.TorusKnotGeometry(2, 0.5, 100, 16);
  return <primitive object={geom} />;
};

const InteractiveTorusKnot = () => {
  const meshRef = useRef();
  const [active, setActive] = useState(false);
  const [hovered, setHover] = useState(false);

  const props = useSpring({
    scale: active ? [0.75, 0.75, 0.75] : [0.6, 0.6, 0.6], // Ajustar la escala
    rotationSpeed: active ? 0.05 : hovered ? 0.02 : 0.01,
  });

  // Custom shader material
  const shaderMaterialRef = useRef();
  const time = useRef(0);

  useFrame(() => {
    meshRef.current.rotation.x += props.rotationSpeed.get();
    meshRef.current.rotation.y += props.rotationSpeed.get();

    // Update the shader material's time uniform to change colors over time
    time.current += 0.1;
    shaderMaterialRef.current.uniforms.uTime.value = time.current;
  });

  return (
    <a.mesh
      ref={meshRef}
      scale={props.scale}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <ToroidalKnotGeometry />
      <a.shaderMaterial
        ref={shaderMaterialRef}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </a.mesh>
  );
};

export default InteractiveTorusKnot;

// Custom shader vertex and fragment shader
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    // Create a mix of colors based on time
    vec3 color1 = vec3(1.0, 0.0, 0.0); // Red
    vec3 color2 = vec3(0.0, 0.0, 1.0); // Blue
    vec3 color3 = vec3(0.0, 1.0, 0.0); // Green
    
    float t = (sin(uTime) + 1.0) / 2.0; // Adjust speed with sin
    vec3 finalColor = mix(color1, color2, t);
    finalColor = mix(finalColor, color3, t);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
