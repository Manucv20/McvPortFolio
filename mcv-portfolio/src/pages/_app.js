import React from 'react';
import Header from '@/components/Header';  // Adjust the path as needed
import Footer from '@/components/Footer';  // Adjust the path as needed
import '@/styles/globals.css'; // Ensure the path to your global styles is correct

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    );
}

export default MyApp;