import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        <Link href="/" className="custom-link">Go to homepage</Link>
      </p>
    </div>
  );
};

export default NotFound;
