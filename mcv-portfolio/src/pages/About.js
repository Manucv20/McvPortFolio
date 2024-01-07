import React from 'react';
import { Typography, Card, CardContent, Button, styled } from '@mui/material';

const MyCard = styled(Card)({
  maxWidth: 400,
  margin: 'auto',
  marginTop: (theme) => theme.spacing(2),
  position: 'relative',
});

const MyImage = styled('div')({
  backgroundImage: 'url(linkedin.png)', // Adjust the path as needed
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '200px', // Adjust the height as needed
});

const MyButton = styled(Button)({
  position: 'absolute',
  bottom: '8px', // Adjust the bottom spacing as needed
  right: '8px', // Adjust the right spacing as needed
});

const About = () => {
  const linkedInProfileUrl = "https://www.linkedin.com/in/mcv20/";

  return (
    <div>
      <MyCard>
        <MyImage />
        <CardContent>
          <Typography variant="h4">Sobre Mí</Typography>
          <Typography paragraph>
            Aquí va tu biografía, experiencia, habilidades, etc.
          </Typography>
        </CardContent>
        <MyButton
          variant="contained"
          color="primary"
          href={linkedInProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View My LinkedIn Profile
        </MyButton>
      </MyCard>
      {/* Add more content as needed */}
    </div>
  );
};

export default About;
