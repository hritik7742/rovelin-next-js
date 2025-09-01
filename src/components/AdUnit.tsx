"use client";

import { useEffect, useRef } from 'react';
import './AdUnit.css';

interface AdUnitProps {
    adSlot: string;
    adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
    style?: React.CSSProperties;
    className?: string;
}

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        adsbygoogle: any[];
    }
}

export default function AdUnit({
    adSlot,
    adFormat = 'auto',
    style = {},
    className = ''
}: AdUnitProps) {
    const adRef = useRef<HTMLModElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isLoadedRef = useRef(false);

    useEffect(() => {
        // Prevent multiple loads of the same ad
        if (isLoadedRef.current) return;

        const loadAd = () => {
            try {
                if (typeof window !== 'undefined' && window.adsbygoogle) {
                    // Check container width and set minimum if needed
                    if (containerRef.current && adRef.current) {
                        const containerWidth = containerRef.current.offsetWidth;
                        
                        // Fix for "No slot size for availableWidth=0" error
                        if (containerWidth === 0) {
                            containerRef.current.style.width = '100%';
                            containerRef.current.style.minWidth = '320px';
                            containerRef.current.style.maxWidth = '100%';
                        }

                        // Ensure the ad element has proper dimensions
                        adRef.current.style.width = '100%';
                        adRef.current.style.minWidth = '300px';
                        adRef.current.style.display = 'block';
                    }

                    // Wait a bit for layout to stabilize before pushing
                    setTimeout(() => {
                        if (!isLoadedRef.current) {
                            (window.adsbygoogle = window.adsbygoogle || []).push({});
                            isLoadedRef.current = true;
                        }
                    }, 100);
                }
            } catch (err) {
                console.error('AdSense error:', err);
            }
        };

        // Load ad after component mounts and layout is ready
        if (document.readyState === 'complete') {
            loadAd();
        } else {
            window.addEventListener('load', loadAd);
            return () => window.removeEventListener('load', loadAd);
        }
    }, []);

    return (
        <div 
            ref={containerRef}
            className={`ad-container ${className}`} 
            style={{
                width: '100%',
                minWidth: '300px',
                maxWidth: '100%',
                ...style
            }}
        >
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ 
                    display: 'block',
                    width: '100%',
                    minWidth: '300px',
                    minHeight: '90px',
                }}
                data-ad-client="ca-pub-2357722369189639"
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive="true"
            />
        </div>
    );
}