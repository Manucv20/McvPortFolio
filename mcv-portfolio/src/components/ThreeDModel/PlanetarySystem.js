import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import InteractiveSphere from '@/components/ThreeDModel/InteractiveSphere';
import InteractiveSphere2 from '@/components/ThreeDModel/InteractiveSphere2';
import InteractiveTorus from '@/components/ThreeDModel/InteractiveTorus';
import InteractiveCube from '@/components/ThreeDModel/InteractiveCube';
import ToroidalKnotGeometry from '@/components/ThreeDModel/ToroidalKnotGeometry';
import InteractiveEdgeDodecahedron from '@/components/ThreeDModel/InteractiveEdgeDodecahedron';

const PlanetarySystem = () => {
    // Creación de elementos con la key correspondiente
    const planetModels = [
        { element: <InteractiveSphere2 key="star" />, type: 'star' },
        { element: <InteractiveTorus key="torus" />, type: 'planet' },
        { element: <InteractiveSphere key="sphere" />, type: 'planet' },
        { element: <InteractiveCube key="cube" />, type: 'planet' },
        { element: <ToroidalKnotGeometry key="knot" />, type: 'planet' },
        { element: <InteractiveEdgeDodecahedron edgeColor="your-edge-color" geometryType="convex" key="dodecahedron" />, type: 'planet' },
    ];

    // Inicialización de referencias
    const planetRefs = useRef(planetModels.map(() => React.createRef()));

    useFrame(({ clock }) => {
        const elapsed = clock.getElapsedTime();
        planetModels.forEach((_, index) => {
            if (index !== 0) { // Saltar la estrella central
                const radius = 5 + 3 * index; // Ajuste de radio
                const angle = elapsed * (0.25 - index * 0.005) + Math.PI * 0.5 * index;
                const planet = planetRefs.current[index].current;
                planet.position.x = radius * Math.sin(angle);
                planet.position.z = radius * Math.cos(angle);
            }
        });
    });

    return (
        <>
            {planetModels.map((model, index) => (
                <mesh key={index} position={[0, 0, 0]} ref={planetRefs.current[index]}>
                    {model.element}
                </mesh>
            ))}
        </>
    );
};

export default PlanetarySystem;
