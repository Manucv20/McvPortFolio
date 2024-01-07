import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProjectCard = ({ title, description }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
