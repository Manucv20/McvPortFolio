import React from 'react';
import { Grid } from '@mui/material';
import ProjectCard from '@/components/ProjectCard';

// Separated static project data
const projectData = [
  { id: 1, title: "Proyecto 1", description: "Descripción del proyecto 1" },
  // ...otros proyectos...
];

const Projects = () => {
  return (
    <Grid container spacing={2}>
      {projectData.map((project) => (
        <Grid item key={project.id} xs={12} sm={6} md={4}>
          <ProjectCard title={project.title} description={project.description} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Projects;
