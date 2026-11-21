import type { TrafficAnalytics } from './google-analytics-data';

/**
 * =========================================================================
 * ROVELIN TRAFFIC ANALYTICS CONFIGURATION (Option 1 - Fast Static Data)
 * 
 * Edit this file anytime you want to update the numbers shown on the website!
 * These numbers are mathematically consistent across top metric cards and charts:
 * 
 * - visitors today: 284 (Chart 7d Sun = 284)
 * - visitors - Last 30 Days: 18,450 (Chart 30d sum = 18,450)
 * - visitors - All Time: 248,320 (Chart all-time sum = 248,320)
 * =========================================================================
 */
export const initialTrafficData: TrafficAnalytics = {
  // Live visitors count displayed in the green bubble (e.g. "5 users browsing right now")
  realtimeUsers: 5,
  source: 'google_analytics',

  // Top 3 summary cards
  metrics: [
    {
      label: 'visitors today',
      value: '284',
      change: '+18%',
    },
    {
      label: 'visitors - Last 30 Days',
      value: '18,450',
      change: '+24%',
    },
    {
      label: 'visitors - All Time',
      value: '248,320',
      change: '+42%',
    },
  ],

  // Traffic charts for each time tab:
  // - 7d sum = 4,084 visitors (daily avg ~630, today is 284)
  // - 30d sum = 18,450 visitors (EXACT match with "visitors - Last 30 Days")
  // - 100d sum = 61,200 visitors (consistent 100-day ratio at ~612/day)
  // - all sum = 248,320 visitors (EXACT match with "visitors - All Time")
  charts: {
    '7d': [
      { label: 'Mon', value: 580 },
      { label: 'Tue', value: 640 },
      { label: 'Wed', value: 675 },
      { label: 'Thu', value: 620 },
      { label: 'Fri', value: 690 },
      { label: 'Sat', value: 595 },
      { label: 'Sun', value: 284 }, // Matches today's 284 visitors
    ],
    '30d': [
      { label: 'Day 5', value: 2680 },
      { label: 'Day 10', value: 2890 },
      { label: 'Day 15', value: 3050 },
      { label: 'Day 20', value: 3180 },
      { label: 'Day 25', value: 3310 },
      { label: 'Day 30', value: 3340 },
    ],
    '100d': [
      { label: 'Day 20', value: 8200 },
      { label: 'Day 40', value: 9100 },
      { label: 'Day 60', value: 9800 },
      { label: 'Day 80', value: 10600 },
      { label: 'Day 100', value: 11400 },
      { label: 'Latest', value: 12100 },
    ],
    all: [
      { label: '2023', value: 32000 },
      { label: '2024', value: 56000 },
      { label: '2025', value: 78000 },
      { label: '2026', value: 52000 },
      { label: 'Recent', value: 30320 },
    ],
  },

  // Top Countries list with 2-letter ISO country codes (for flag icons)
  // Ordered with Top-Tier (high revenue/income) countries on top and lower-tier countries at the bottom
  countries: [
    { countryCode: 'US', country: 'United States', percent: 38 },
    { countryCode: 'GB', country: 'United Kingdom', percent: 18 },
    { countryCode: 'DE', country: 'Germany', percent: 12 },
    { countryCode: 'CA', country: 'Canada', percent: 9 },
    { countryCode: 'IN', country: 'India', percent: 8 },
    { countryCode: 'PK', country: 'Pakistan', percent: 4 },
    { countryCode: '', country: 'Others', percent: 11 },
  ],
};
