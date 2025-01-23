import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import SocialBanner from '@/components/SocialBanner';
import { Cedarville_Cursive, Dancing_Script, Great_Vibes, Sacramento, Pacifico } from 'next/font/google';

// Initialize fonts
const cedarville = Cedarville_Cursive({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cedarville'
});

// ... Initialize other fonts similarly ...

export const metadata: Metadata = {
  title: 'Rovelin Studio | Innovative Software & Chrome Extension Development',
  description: 'Rovelin Studio specializes in creating powerful Chrome extensions, web applications, and custom software solutions that drive business growth and innovation.',
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
