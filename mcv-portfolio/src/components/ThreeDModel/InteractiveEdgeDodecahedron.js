import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import {
  SphereGeometry,
  DodecahedronGeometry,
  IcosahedronGeometry,
  BoxGeometry,
  CylinderGeometry,
  OctahedronGeometry,
  EdgesGeometry,
} from 'three';

export const geometryOptions = [
  { label: 'Dodecahedron', value: 'dodecahedron' },
  { label: 'Sphere', value: 'sphere' },
  { label: 'Icosahedron', value: 'icosahedron' },
  { label: 'Box', value: 'box' },
  { label: 'Cylinder', value: 'cylinder' },
  { label: 'Octahedron', value: 'octahedron' },
];

export const InteractiveEdgeDodecahedron = ({ geometryType }) => {
  const meshRef = useRef();
  const [active, setActive] = useState(false);

  const { scale, rotationSpeed } = useSpring({
    scale: active ? 1.2 : 1,
    rotationSpeed: active ? 0.03 : 0.005,
    config: { mass: 1, tension: 180, friction: 12 },
  });

  useFrame(() => {
    meshRef.current.rotation.x += rotationSpeed.get();
    meshRef.current.rotation.y += rotationSpeed.get();
  });

  const createGeometry = (type) => {
    switch (type) {
      case 'dodecahedron':
        return new DodecahedronGeometry(2.5, 0);
      case 'sphere':
        return new SphereGeometry(2.5, 25, 25);
      case 'icosahedron':
        return new IcosahedronGeometry(2.5, 0);
      case 'box':
        return new BoxGeometry(2.5, 2.5, 2.5);
      case 'cylinder':
        return new CylinderGeometry(2, 2, 3, 25);
      case 'octahedron':
        return new OctahedronGeometry(2.5, 0);
      default:
        return new DodecahedronGeometry(2.5, 0);
    }
  };

  const edges = useMemo(() => {
    const geom = createGeometry(geometryType);
    return new EdgesGeometry(geom);
  }, [geometryType]);

  return (
    <a.lineSegments
      ref={meshRef}
      scale={scale.to((s) => [s, s, s])}
      onClick={() => setActive(!active)}
    >
      <lineSegments>
        <bufferGeometry attach="geometry" {...edges} />
        <lineBasicMaterial attach="material" color="red" />
      </lineSegments>
    </a.lineSegments>
  );
};

export default InteractiveEdgeDodecahedron;
