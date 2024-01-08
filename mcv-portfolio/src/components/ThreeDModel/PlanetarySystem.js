import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import InteractiveSphere from '@/components/ThreeDModel/InteractiveSphere';
import InteractiveSphere2 from '@/components/ThreeDModel/InteractiveSphere2';
import InteractiveTorus from '@/components/ThreeDModel/InteractiveTorus';
import InteractiveCube from '@/components/ThreeDModel/InteractiveCube';
import ToroidalKnotGeometry from '@/components/ThreeDModel/ToroidalKnotGeometry';
import InteractiveEdgeDodecahedron from '@/components/ThreeDModel/InteractiveEdgeDodecahedron';

const PlanetarySystem = () => {
    const planetModels = [
        <InteractiveSphere2 />, // Central star (replaced with InteractiveSphere2)
        <InteractiveSphere />,
        <InteractiveTorus />,
        <InteractiveCube />,
        <ToroidalKnotGeometry />,
        <InteractiveEdgeDodecahedron edgeColor="your-edge-color" geometryType="convex" />,
    ];

    // Increased distances for a more spacious layout
    const planetPositions = [
        [0, 0, 0],    // Central star
        [5, 0, 0],    // First planet
        [7, 0, 0],    // Second planet
        [10, 0, 0],   // Third planet
        [13, 0, 0],   // Fourth planet
        [16, 0, 0],   // Fifth planet
    ];

    const planetRefs = planetPositions.map(() => useRef());

    useFrame(({ clock }) => {
        const elapsed = clock.getElapsedTime();
        planetPositions.forEach((_, index) => {
            if (index !== 0) { // Skip the central star
                const radius = Math.sqrt(planetPositions[index][0] ** 2 + planetPositions[index][2] ** 2);
                const angle = elapsed * (0.1 - index * 0.01) + index; // Different rotation speed for each planet
                const planet = planetRefs[index].current;
                planet.position.x = radius * Math.sin(angle);
                planet.position.z = radius * Math.cos(angle);
            }
        });
    });

    return (
        <>
            {planetModels.map((model, index) => (
                <mesh key={index} position={planetPositions[index]} ref={planetRefs[index]}>
                    {model}
                </mesh>
            ))}
        </>
    );
};

export default PlanetarySystem;
