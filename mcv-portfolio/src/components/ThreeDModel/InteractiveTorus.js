import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';

const InteractiveTorus = () => {
  const meshRef = useRef();
  const [active, setActive] = useState(false);
  const [hovered, setHover] = useState(false);

  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? 'hotpink' : 'blue',
    rotationSpeed: active ? 0.05 : hovered ? 0.02 : 0.01
  });

  useFrame(() => {
    meshRef.current.rotation.x += props.rotationSpeed.get();
    meshRef.current.rotation.y += props.rotationSpeed.get();
  });

  return (
    <a.mesh
      ref={meshRef}
      scale={props.scale}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <a.meshStandardMaterial color={props.color} />
    </a.mesh>
  );
};

export default InteractiveTorus;
