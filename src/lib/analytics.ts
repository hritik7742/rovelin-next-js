import { Analytics } from '@vercel/analytics/react';
import React from 'react';

// Define gtag parameter types
interface GtagEvent {
  event_category: string;
  event_label?: string;
  value?: number;
  send_to: string;
}

// Define window.gtag function type
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      action: string,
      params: GtagEvent
    ) => void;
  }
}

export const GoogleAnalytics: React.FC = () => {
  return React.createElement(Analytics);
};

// Custom event tracking function
export const trackEvent = (category: string, action: string, label?: string, value?: number): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventParams: GtagEvent = {
      event_category: category,
      event_label: label,
      value: value,
      send_to: 'G-6010KNTQ28'
    };

    window.gtag('event', action, eventParams);
  }
}; 