import React, { useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const InteractiveModel2 = ({ modelPath }) => {
    const obj = useLoader(OBJLoader, modelPath);
    const meshRef = useRef();
    const [active, setActive] = useState(false);
    const [hovered, setHover] = useState(false);

    const props = useSpring({
        scale: active ? [0.1, 0.1, 0.1] : [0.1, 0.1, 0.1],
    });

    return (
        <a.mesh
            ref={meshRef}
            scale={props.scale}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <primitive object={obj} dispose={null} />
        </a.mesh>
    );
};

export default InteractiveModel2;
