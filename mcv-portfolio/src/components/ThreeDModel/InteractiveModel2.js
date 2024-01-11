import React, { useRef, useState, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader, Box3, Vector3 } from 'three';

const InteractiveModel2 = ({ modelPath, texturePath }) => {
    const obj = useLoader(OBJLoader, modelPath);
    const texture = useLoader(TextureLoader, texturePath);
    const meshRef = useRef();
    const [active, setActive] = useState(false);

    const props = useSpring({
        scale: active ? [0.2, 0.2, 0.2] : [0.1, 0.1, 0.1], // Adjust scale here
    });

    useEffect(() => {
        const box = new Box3().setFromObject(obj);
        const center = box.getCenter(new Vector3());

        obj.position.x += (obj.position.x - center.x);
        obj.position.y += (obj.position.y - center.y);
        obj.position.z += (obj.position.z - center.z);

        obj.traverse((child) => {
            if (child.isMesh) {
                child.material.map = texture;
            }
        });
    }, [obj, texture]);

    return (
        <a.mesh
            ref={meshRef}
            position={[0, 0, 0]} // Adjust position here
            rotation={[-2, 0, 0]} // Adjust rotation here
            scale={props.scale}
            onClick={() => setActive(!active)}
        >
            <primitive object={obj} dispose={null} />
        </a.mesh>
    );
};

export default InteractiveModel2;
