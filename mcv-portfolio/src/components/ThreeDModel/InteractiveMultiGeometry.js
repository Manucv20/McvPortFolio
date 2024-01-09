import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { SphereGeometry, OctahedronGeometry, EdgesGeometry, MeshPhongMaterial, LineBasicMaterial } from 'three';

const InteractiveMultiGeometry = () => {
    const meshRef = useRef(); // Ref for the sphere
    const diamondRef = useRef(); // Ref for the diamond
    const diamondEdgesRef = useRef(); // Ref for the diamond edges
    const [active, setActive] = useState(false); // State for active interaction

    // Spring animation for scale and rotation speed
    const { scale, rotationSpeed } = useSpring({
        scale: active ? 1.2 : 1,
        rotationSpeed: active ? 0.03 : 0.005,
        config: { mass: 1, tension: 180, friction: 12 },
    });

    useFrame(() => {
        // Rotate sphere around itself with an inclination
        meshRef.current.rotation.y += rotationSpeed.get();
        meshRef.current.rotation.x = Math.PI / 180 * 20; // 20 degrees inclination in radians

        // Synchronized rotation for diamond and its edges
        const rotateValue = rotationSpeed.get();
        diamondRef.current.rotation.x -= rotateValue;
        diamondRef.current.rotation.y -= rotateValue;
        diamondEdgesRef.current.rotation.x = diamondRef.current.rotation.x;
        diamondEdgesRef.current.rotation.y = diamondRef.current.rotation.y;
    });

    // Sphere Geometry and edges
    const sphereEdges = useMemo(() => new EdgesGeometry(new SphereGeometry(2.5, 15, 15)), []);

    // Diamond Geometry and Material
    const diamondGeometry = useMemo(() => new OctahedronGeometry(1.5, 0), []);
    const diamondMaterial = useMemo(() => new MeshPhongMaterial({
        color: 'lightblue',
        specular: 0xaaaaaa,
        reflectivity: 10,
        shininess: 100
    }), []);

    // Diamond edges for highlighting
    const diamondEdges = useMemo(() => new EdgesGeometry(diamondGeometry), [diamondGeometry]);
    const diamondEdgeMaterial = new LineBasicMaterial({ color: 'black', linewidth: 2 });

    return (
        <>
            {/* Sphere with highlighted edges */}
            <a.lineSegments
                ref={meshRef}
                scale={scale.to((s) => [s, s, s])}
                onClick={() => setActive(!active)}
                position={[0, 0, 0]}
            >
                <lineSegments>
                    <bufferGeometry attach="geometry" {...sphereEdges} />
                    <lineBasicMaterial attach="material" color="white" />
                </lineSegments>
            </a.lineSegments>

            {/* Diamond with reflective material */}
            <a.mesh
                ref={diamondRef}
                scale={scale.to((s) => [s, s, s])}
                onClick={() => setActive(!active)}
                position={[0, 0, 0]}
            >
                <octahedronGeometry attach="geometry" args={[1.5, 0]} />
                <meshPhongMaterial attach="material" {...diamondMaterial} />
            </a.mesh>

            {/* Diamond edges for highlighting */}
            <a.lineSegments
                ref={diamondEdgesRef}
                geometry={diamondEdges}
                material={diamondEdgeMaterial}
                scale={scale.to((s) => [s, s, s])}
                position={[0, 0, 0]}
            />
        </>
    );
};

export default InteractiveMultiGeometry;
