"use client";

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SocialBanner from '@/components/SocialBanner';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDirectoryOnlyPage = pathname === '/Our-products' || pathname.startsWith('/sponsor');

  if (isDirectoryOnlyPage) {
    return <>{children}</>;
  }

  return (
    <>
      <SocialBanner />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
