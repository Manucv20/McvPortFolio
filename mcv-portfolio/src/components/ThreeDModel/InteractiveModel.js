import React, { useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { GLTFLoader } from 'three-stdlib';

const InteractiveModel = ({ modelPath }) => {
    const gltf = useLoader(GLTFLoader, modelPath);
    const meshRef = useRef();
    const [active, setActive] = useState(false);
    const [hovered, setHover] = useState(false);

    const props = useSpring({
        scale: active ? [1.5, 1.5, 1.5] : [8, 8, 8],
    });

    return (
        <a.mesh
            ref={meshRef}
            scale={props.scale}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <primitive object={gltf.scene} dispose={null} />
        </a.mesh>
    );
};

export default InteractiveModel;
