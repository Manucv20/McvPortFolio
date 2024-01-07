import React from 'react';
import { useBox } from '@react-three/cannon';
import { BoxGeometry } from 'three';

const ThreeDModel = () => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [0, 2, 0]
  }));

  return (
    <mesh 
      ref={ref} 
      onClick={() => api.applyImpulse([0, 5, 0], [0, 0, 0])}
    >
      <primitive object={new BoxGeometry(1, 1, 1)} /> {/* Adjust size as needed */}
      <meshStandardMaterial color='orange' />
    </mesh>
  );
};

export default ThreeDModel;
