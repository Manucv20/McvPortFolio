import React, { useState } from 'react';
import Head from 'next/head';
import {
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Canvas, useThree } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { OrbitControls, Stars } from '@react-three/drei';

import InteractiveSphere from '@/components/ThreeDModel/InteractiveSphere';
import InteractiveSphere2 from '@/components/ThreeDModel/InteractiveSphere2';
import InteractiveTorus from '@/components/ThreeDModel/InteractiveTorus';
import InteractiveCube from '@/components/ThreeDModel/InteractiveCube';
import ToroidalKnotGeometry from '@/components/ThreeDModel/ToroidalKnotGeometry';
import InteractiveMultiGeometry from '@/components/ThreeDModel/InteractiveMultiGeometry';
import InteractiveEdgeDodecahedron, { geometryOptions } from '@/components/ThreeDModel/InteractiveEdgeDodecahedron';
import PlanetarySystem from '@/components/ThreeDModel/PlanetarySystem';
import InteractiveModel from '@/components/ThreeDModel/InteractiveModel';
import InteractiveModel2 from '@/components/ThreeDModel/InteractiveModel2';


export default function Home() {
  const [activeModel, setActiveModel] = useState('sphere');
  const [geometryType, setGeometryType] = useState('convex');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderHeroSection = () => (
    <Box
      sx={{
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundImage: 'url(https://cdn.esawebb.org/archives/images/publicationjpg/weic2205a.jpg)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: theme.spacing(2), color: "black", fontSize: isMobile ? '4.5rem' : '6.5rem' }}>3D Objets</Typography>
      <Typography variant="h5" sx={{ marginBottom: theme.spacing(3), color: "black", fontSize: isMobile ? '1.2rem' : '1.5rem' }}>Discover Three.js</Typography>
    </Box>
  );

  const renderControlButtons = () => (
    activeModel === 'InteractiveEdgeDodecahedron' && (
      <Box sx={{ textAlign: 'center', marginTop: theme.spacing(0.5) }}>
        <Typography variant="h6" gutterBottom>
          Select Geometry Type
        </Typography>
        <Slider
          value={geometryOptions.findIndex((option) => option.value === geometryType)}
          min={0}
          max={geometryOptions.length - 1}
          step={1}
          onChange={(event, newValue) => setGeometryType(geometryOptions[newValue].value)}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => geometryOptions[value].label}
          aria-label="Geometry Type"
          sx={{ width: '300px' }}
        />
      </Box>
    )
  );

  const IsometricCamera = () => {
    const { camera } = useThree();

    React.useEffect(() => {
      const isometricPosition = [5, 5, 5]; // Adjust these values for your scene
      camera.position.set(...isometricPosition);
      camera.lookAt(0, 0, 0); // The camera will look at the origin
      camera.zoom = 40; // Adjust the zoom level as needed
      camera.updateProjectionMatrix();
    }, [camera]);

    return null;
  };


  const render3DSection = () => (
    <Box
      sx={{
        height: '450px',
        width: '100%',
      }}
    >
      <Canvas style={{ background: 'black' }} orthographic>
        <IsometricCamera />
        <ambientLight intensity={0.8} /> {/* Increased ambient light for overall brightness */}
        <pointLight position={[10, 10, 10]} intensity={2} /> {/* Reduced intensity for softer shadows */}
        <spotLight position={[10, 15, 10]} angle={0.3} intensity={2} penumbra={0.5} /> {/* Adjusted for a more focused spotlight */}
        <directionalLight position={[-2, 5, 2]} intensity={2} /> {/* Reduced intensity for less harsh sunlight effect */}
        <OrbitControls enableZoom={true} />
        <Stars
          radius={50}
          depth={25}
          count={99999}
          factor={3}
          saturation={1}
          fade={true}
          speed={1}
        />
        <Physics>
          {activeModel === 'sphere' && <InteractiveSphere />}
          {activeModel === 'sphere2' && <InteractiveSphere2 />}
          {activeModel === 'torus' && <InteractiveTorus />}
          {activeModel === 'box' && <InteractiveCube />}
          {activeModel === 'Toroidal' && <ToroidalKnotGeometry />}
          {activeModel === 'InteractiveMultiGeometry' && <InteractiveMultiGeometry />}
          {activeModel === 'InteractiveEdgeDodecahedron' && (
            <InteractiveEdgeDodecahedron edgeColor="your-edge-color" geometryType={geometryType} />
          )}
          {activeModel === 'PlanetarySystem' && <PlanetarySystem />}
          {activeModel === 'GLBModel' && <InteractiveModel modelPath="/manuModel.gltf" />}
          {activeModel === 'objModel' && <InteractiveModel2 modelPath="/skull.obj" texturePath="/skull.jpg" />}
        </Physics>
      </Canvas>
    </Box>
  );


  const renderModelButtons = () => {
    const modelOptions = [
      { value: 'sphere', label: 'Sphere' },
      { value: 'sphere2', label: 'Sphere 2' },
      { value: 'torus', label: 'Torus' },
      { value: 'box', label: '3D Box' },
      { value: 'Toroidal', label: 'Toroidal Knot' },
      { value: 'InteractiveMultiGeometry', label: 'MultiGeometry' },
      { value: 'InteractiveEdgeDodecahedron', label: 'Interactive Edge Dodecahedron' },
      { value: 'PlanetarySystem', label: 'Planetary System' },
      { value: 'GLBModel', label: 'GLB Model' },
      { value: 'objModel', label: 'OBJ Model' },
    ];

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="model-selector-label">Select Model</InputLabel>
          <Select
            labelId="model-selector-label"
            id="model-selector"
            value={activeModel}
            label="Select Model"
            onChange={(e) => setActiveModel(e.target.value)}
          >
            {modelOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  return (
    <>
      <Head>
        <title>Welcome to My Portfolio</title>
        <meta name="description" content="Discover my projects and learn more about me" />
      </Head>
      <div>
        {renderHeroSection()}
        {render3DSection()}
        {renderModelButtons()}
        {renderControlButtons()}
      </div>
    </>
  );
}
