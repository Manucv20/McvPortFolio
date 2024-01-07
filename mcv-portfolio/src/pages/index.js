import React, { useState } from 'react';
import Head from 'next/head';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  useMediaQuery,
  useTheme,
  Slider,
} from '@mui/material';
import { Canvas, useThree } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { OrbitControls, Stars } from '@react-three/drei';

import InteractiveSphere from '@/components/ThreeDModel/InteractiveSphere.js';
import InteractiveTorus from '@/components/ThreeDModel/InteractiveTorus';
import InteractiveCube from '@/components/ThreeDModel/InteractiveCube';
import ToroidalKnotGeometry from '@/components/ThreeDModel/ToroidalKnotGeometry';
import InteractiveEdgeDodecahedron, { geometryOptions } from '@/components/ThreeDModel/InteractiveEdgeDodecahedron';

export default function Home() {
  const [activeModel, setActiveModel] = useState('sphere');
  const [geometryType, setGeometryType] = useState('convex');
  const [hoveredCard, setHoveredCard] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const projects = [
    { id: 1, title: 'Project 1', description: 'Description of Project 1', imageUrl: '/path-to-your-image' },
    { id: 2, title: 'Project 2', description: 'Description of Project 2', imageUrl: '/path-to-your-image' },
    // Add more projects as needed
  ];

  const handleMouseEnter = (id) => setHoveredCard(id);
  const handleMouseLeave = () => setHoveredCard(null);

  const renderHeroSection = () => (
    <Box
      sx={{
        padding: theme.spacing(5),
        textAlign: 'center',
        backgroundImage: 'url(https://images.alphacoders.com/134/1341414.png)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: theme.spacing(2), fontSize: isMobile ? '2.5rem' : '3.5rem' }}>Welcome to My Portfolio</Typography>
      <Typography variant="h5" sx={{ marginBottom: theme.spacing(3), fontSize: isMobile ? '1.2rem' : '1.5rem' }}>Discover My Projects and Learn More About Me</Typography>
      <Button variant="contained" color="primary" sx={{ padding: theme.spacing(1, 5) }}>View My Work</Button>
    </Box>
  );

  const renderControlButtons = () => (
    activeModel === 'InteractiveEdgeDodecahedron' && (
      <Box sx={{ textAlign: 'center', marginTop: theme.spacing(2.5) }}>
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
          sx={{ width: '200px' }}
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
      camera.zoom = 50; // Adjust the zoom level as needed
      camera.updateProjectionMatrix();
    }, [camera]);

    return null;
  };


  const render3DSection = () => (
    <Box
      sx={{
        height: '300px',
        width: '100%',
        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Canvas style={{ background: 'black' }} orthographic>
        <IsometricCamera />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <OrbitControls enableZoom={true} />
        <Stars
          radius={50} // Distance from the center
          depth={25}  // Layer depth of stars
          count={99999} // Number of stars, increased for density
          factor={3}  // Factor for star distribution
          saturation={1} // Color saturation of stars
          fade={true} // Fading effect on stars
        />
        <Physics>
          {activeModel === 'sphere' && <InteractiveSphere />}
          {activeModel === 'torus' && <InteractiveTorus />}
          {activeModel === 'box' && <InteractiveCube />}
          {activeModel === 'Toroidal' && <ToroidalKnotGeometry />}
          {activeModel === 'InteractiveEdgeDodecahedron' && (
            <InteractiveEdgeDodecahedron edgeColor="your-edge-color" geometryType={geometryType} />
          )}
        </Physics>
      </Canvas>
    </Box>
  );



  const renderModelButtons = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: theme.spacing(1.25), marginTop: theme.spacing(2.5), flexWrap: 'wrap' }}>
      <Button variant="outlined" color="primary" onClick={() => setActiveModel('sphere')} aria-label="Show Sphere">Sphere</Button>
      <Button variant="outlined" color="primary" onClick={() => setActiveModel('torus')} aria-label="Show Torus">Torus</Button>
      <Button variant="outlined" color="primary" onClick={() => setActiveModel('box')} aria-label="Show 3D Box">3D Box</Button>
      <Button variant="outlined" color="primary" onClick={() => setActiveModel('Toroidal')} aria-label="Show Toroidal Knot">Toroidal Knot</Button>
      <Button variant="outlined" color="primary" onClick={() => setActiveModel('InteractiveEdgeDodecahedron')} aria-label="Show Interactive Edge Dodecahedron">Interactive Edge Dodecahedron</Button>
    </Box>
  );

  const renderFeaturedProjects = () => (
    <Box sx={{ padding: theme.spacing(2.5) }}>
      <Typography variant="h4">Featured Projects</Typography>
      <Grid container spacing={isMobile ? 1 : 2}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={handleMouseLeave}
              sx={{
                boxShadow: hoveredCard === project.id ? '0px 10px 20px rgba(0,0,0,0.2)' : '',
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            >
              <CardMedia component="img" height="180" image={project.imageUrl} alt={project.title} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">{project.title}</Typography>
                <Typography variant="body2" color="text.secondary">{project.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <>
      <Head>
        <title>Welcome to My Portfolio</title>
        <meta name="description" content="Discover my projects and learn more about me" />
      </Head>
      <div>
        {renderHeroSection()}
        {render3DSection()}
        {renderControlButtons()}
        {renderModelButtons()}
        {renderFeaturedProjects()}
      </div>
    </>
  );
}