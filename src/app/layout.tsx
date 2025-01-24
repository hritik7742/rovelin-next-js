import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import SocialBanner from '@/components/SocialBanner';
import { Cedarville_Cursive } from 'next/font/google';

// Initialize fonts
const cedarville = Cedarville_Cursive({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cedarville'
});

// ... Initialize other fonts similarly ...

export const metadata: Metadata = {
  metadataBase: new URL('https://rovelinstudio.com'),
  title: 'Rovelin Studio | Innovative Software & Chrome Extension Development',
  description: 'Rovelin Studio specializes in creating powerful Chrome extensions, web applications, and custom software solutions that drive business growth and innovation.',
  openGraph: {
    title: 'Rovelin Studio | Innovative Software Development',
    description: 'Powerful Chrome extensions, web applications, and custom software solutions that drive business growth and innovation.',
    url: 'https://rovelinstudio.com',
    siteName: 'Rovelin Studio',
    images: [
      {
        url: '/images/og-image.jpg', // Make sure to add this image to your public/images folder
        width: 1200,
        height: 630,
        alt: 'Rovelin Studio - Software Development Solutions'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rovelin Studio | Innovative Software Development',
    description: 'Powerful Chrome extensions, web applications, and custom software solutions.',
    images: ['/images/og-image.png'], // Same image can be used for Twitter
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cedarville.variable} /* other font variables */`}>
      <body>
        <SocialBanner />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
