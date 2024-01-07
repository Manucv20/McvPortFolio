import React from 'react';

function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 - Page Not Found</h1>
      <p style={styles.paragraph}>Sorry, the page you are looking for does not exist.</p>
      <p style={styles.paragraph}>You can always go back to the <a href="/">homepage</a>.</p>
    </div>
  );
}

// You can adjust these styles or use CSS/SCSS as per your project setup
const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '50px',
  },
  header: {
    fontSize: '48px',
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: '20px',
    marginTop: '20px',
  },
};

export default NotFound;
