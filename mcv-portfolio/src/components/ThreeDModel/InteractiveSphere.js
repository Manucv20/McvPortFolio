import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const InteractiveSphere = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(2); // Starting scale set to 2

  // Load the texture from the public directory
  const texture = useLoader(TextureLoader, '/matrix.jpg');

  useFrame(({ clock }) => {
    // Continuous spin
    meshRef.current.rotation.y += 0.01;

    // Bounce effect when hovered
    if (hovered) {
      const bounceScale = 2.5 + Math.sin(clock.getElapsedTime() * 10) * 0.1;
      setScale(bounceScale);
    } else {
      // Gradually return to normal scale
      if (scale > 2) {
        setScale(scale - 0.1);
      }
    }

    // Apply scale
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default InteractiveSphere;
