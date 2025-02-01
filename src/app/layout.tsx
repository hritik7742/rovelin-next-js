import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import SocialBanner from '@/components/SocialBanner';
import { Cedarville_Cursive } from 'next/font/google';
import { GoogleAnalytics } from '@/lib/analytics';
import Script from 'next/script';

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
      <head>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-6010KNTQ28`}
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6010KNTQ28', {
                page_path: window.location.pathname,
                stream_id: '10187641018',
                stream_name: 'rovelin',
                stream_url: 'https://rovelin.com'
              });
            `,
          }}
        />
      </head>
      <body>
        <SocialBanner />
        <Navbar />
        {children}
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}






