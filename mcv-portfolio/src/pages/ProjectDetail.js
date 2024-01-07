import React from 'react';
//import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

const ProjectDetail = () => {
  //const { projectId } = useParams();
  // Aquí buscarías la información del proyecto usando el projectId

  return (
    <div>
      <Typography variant="h4">Detalle del Proyecto</Typography>
      {/* Mostrar detalles del proyecto aquí */}
    </div>
  );
}

export default ProjectDetail;
