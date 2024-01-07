import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { SphereGeometry, EdgesGeometry, LineBasicMaterial } from 'three';

const InteractiveSphere2 = ({ initialRadius = 2.5, updateInterval = 250 }) => {
    const meshRef = useRef();
    const [active, setActive] = useState(false);
    const [widthSegments, setWidthSegments] = useState(5);
    const [heightSegments, setHeightSegments] = useState(5);

    // Adjust the scale and rotation speed based on the active state
    const { scale, rotationSpeed } = useSpring({
        scale: active ? 1.2 : 1,
        rotationSpeed: active ? 0.03 : 0.005,
        config: { mass: 1, tension: 180, friction: 12 },
    });

    // Animate the sphere
    useFrame(() => {
        meshRef.current.rotation.x += rotationSpeed.get();
        meshRef.current.rotation.y += rotationSpeed.get();
    });

    // Update geometry parameters periodically
    useEffect(() => {
        const interval = setInterval(() => {
            setWidthSegments((prev) => (prev >= 60 ? 5 : prev + 1));
            setHeightSegments((prev) => (prev >= 60 ? 5 : prev + 1));
        }, updateInterval);

        return () => clearInterval(interval);
    }, [updateInterval]);

    // Sphere geometry as edges
    const edges = new EdgesGeometry(new SphereGeometry(initialRadius, widthSegments, heightSegments));

    return (
        <a.lineSegments
            ref={meshRef}
            scale={scale.to((s) => [s, s, s])}
            onClick={() => setActive(!active)}
        >
            <bufferGeometry attach="geometry" {...edges} />
            <lineBasicMaterial attach="material" color="blue" />
        </a.lineSegments>
    );
};

export default InteractiveSphere2;
