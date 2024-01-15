import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { SphereGeometry, OctahedronGeometry, EdgesGeometry, MeshPhongMaterial, LineBasicMaterial, TextureLoader } from 'three';

const InteractiveMultiGeometry = () => {
    const meshRef = useRef();
    const diamondRef = useRef();
    const diamondEdgesRef = useRef();
    const [active, setActive] = useState(false);

    const { scale, rotationSpeed } = useSpring({
        scale: active ? 1.2 : 1,
        rotationSpeed: active ? 0.03 : 0.005,
        config: { mass: 1, tension: 180, friction: 12 },
    });

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += rotationSpeed.get();
            meshRef.current.rotation.x = Math.PI / 180 * 20; // 20 degrees
        }

        if (diamondRef.current && diamondEdgesRef.current) {
            const rotateValue = rotationSpeed.get();
            diamondRef.current.rotation.x -= rotateValue;
            diamondRef.current.rotation.y -= rotateValue;
            diamondEdgesRef.current.rotation.x = diamondRef.current.rotation.x;
            diamondEdgesRef.current.rotation.y = diamondRef.current.rotation.y;
        }
    });

    const sphereEdges = useMemo(() => new EdgesGeometry(new SphereGeometry(2.5, 12, 12)), []);
    const diamondGeometry = useMemo(() => new OctahedronGeometry(1.5, 0), []);

    const diamondMaterial = useMemo(() => new MeshPhongMaterial({
        color: '#9F3BAD',
        specular: 0,
        reflectivity: 50,
        shininess: 100,
        opacity: 0.6,
        transparent: true,
    }), []);

    const diamondEdges = useMemo(() => new EdgesGeometry(diamondGeometry), [diamondGeometry]);
    const diamondEdgeMaterial = new LineBasicMaterial({ color: '#5F255B', linewidth: 2 });

    return (
        <>
            <a.lineSegments ref={meshRef} scale={scale.to(s => [s, s, s])} onClick={() => setActive(!active)} position={[0, 0, 0]}>
                <bufferGeometry attach="geometry" {...sphereEdges} />
                <lineBasicMaterial attach="material" color="##6F6B6F" />
            </a.lineSegments>
            <a.mesh ref={diamondRef} scale={scale.to(s => [s, s, s])} onClick={() => setActive(!active)} position={[0, 0, 0]}>
                <octahedronGeometry attach="geometry" args={[1.5, 0]} />
                <meshPhongMaterial attach="material" {...diamondMaterial} />
            </a.mesh>

            <a.lineSegments ref={diamondEdgesRef} scale={scale.to(s => [s, s, s])} position={[0, 0, 0]}>
                <bufferGeometry attach="geometry" {...diamondEdges} />
                <lineBasicMaterial attach="material" {...diamondEdgeMaterial} />
            </a.lineSegments>
        </>
    );
};

export default InteractiveMultiGeometry;