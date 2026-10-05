import crypto from 'crypto';

export interface TrafficMetric {
  value: string;
  label: string;
  change: string;
}

export interface TrafficPoint {
  label: string;
  value: number;
}

export interface CountryTraffic {
  country: string;
  percent: number;
  countryCode: string;
}

export type TrafficChartRange = '7d' | '30d' | '100d' | 'all';

export interface TrafficAnalytics {
  realtimeUsers: number;
  metrics: TrafficMetric[];
  charts: Record<TrafficChartRange, TrafficPoint[]>;
  countries: CountryTraffic[];
  source: 'google_analytics' | 'fallback';
}

interface RunReportResponse {
  rows?: Array<{
    dimensionValues?: Array<{ value?: string }>;
    metricValues?: Array<{ value?: string }>;
  }>;
}

const fallbackAnalytics: TrafficAnalytics = {
  realtimeUsers: 43,
  source: 'fallback',
  metrics: [
    { value: '1,284', label: 'visitors today', change: '+12%' },
    { value: '64,400', label: 'visitors - Last 30 Days', change: '+34%' },
    { value: '214,800', label: 'visitors - All Time', change: '+42%' },
  ],
  charts: {
    '7d': [
      { label: 'Mon', value: 820 },
      { label: 'Tue', value: 980 },
      { label: 'Wed', value: 910 },
      { label: 'Thu', value: 1150 },
      { label: 'Fri', value: 1260 },
      { label: 'Sat', value: 1040 },
      { label: 'Sun', value: 1380 },
    ],
    '30d': [
      { label: 'Sep 6', value: 4400 },
      { label: 'Sep 11', value: 5200 },
      { label: 'Sep 16', value: 4900 },
      { label: 'Sep 21', value: 6100 },
      { label: 'Sep 26', value: 6800 },
      { label: 'Oct 1', value: 7400 },
    ],
    '100d': [
      { label: 'Jun 28', value: 15400 },
      { label: 'Jul 14', value: 17200 },
      { label: 'Jul 30', value: 18900 },
      { label: 'Aug 15', value: 21400 },
      { label: 'Aug 31', value: 23200 },
      { label: 'Sep 16', value: 24800 },
      { label: 'Oct 2', value: 28400 },
    ],
    all: [
      { label: 'Jan 2026', value: 38000 },
      { label: 'Mar 2026', value: 52000 },
      { label: 'May 2026', value: 71000 },
      { label: 'Jul 2026', value: 96000 },
      { label: 'Sep 2026', value: 128000 },
    ],
  },
  countries: [
    { countryCode: 'US', country: 'United States', percent: 38 },
    { countryCode: 'IN', country: 'India', percent: 12 },
    { countryCode: 'GB', country: 'United Kingdom', percent: 8 },
    { countryCode: 'DE', country: 'Germany', percent: 6 },
    { countryCode: 'CA', country: 'Canada', percent: 5 },
    { countryCode: '', country: 'Others', percent: 31 },
  ],
};

const analyticsTrafficMetric = 'screenPageViews';
const topTierCountryCodes = new Set(['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'NL', 'SE', 'CH', 'NO', 'DK', 'FI', 'IE', 'SG', 'AE', 'JP', 'KR']);

interface DailyPoint {
  date: string;
  value: number;
}

const base64Url = (input: string | Buffer) => Buffer.from(input)
  .toString('base64')
  .replace(/=/g, '')
  .replace(/\+/g, '-')
  .replace(/\//g, '_');

const getPrivateKey = () => process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

const getPropertyPath = () => {
  const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

  if (!propertyId) {
    throw new Error('Missing Google Analytics property id.');
  }

  return propertyId.startsWith('properties/') ? propertyId : `properties/${propertyId}`;
};

const getAccessToken = async () => {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = getPrivateKey();

  if (!clientEmail || !privateKey) {
    throw new Error('Missing Google Analytics service account credentials.');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64Url(JSON.stringify({
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const unsignedJwt = `${header}.${claim}`;
  const signature = base64Url(crypto.sign('RSA-SHA256', Buffer.from(unsignedJwt), privateKey));
  const jwt = `${unsignedJwt}.${signature}`;
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google OAuth token request failed: ${await response.text()}`);
  }

  const payload = await response.json() as { access_token?: string };

  if (!payload.access_token) {
    throw new Error('Google OAuth response did not include an access token.');
  }

  return payload.access_token;
};

const runReport = async (accessToken: string, body: Record<string, unknown>) => {
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/${getPropertyPath()}:runReport`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Google Analytics report failed: ${await response.text()}`);
  }

  return response.json() as Promise<RunReportResponse>;
};

const runRealtimeUsersReport = async (accessToken: string) => {
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/${getPropertyPath()}:runRealtimeReport`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      metrics: [{ name: 'activeUsers' }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Google Analytics realtime report failed: ${await response.text()}`);
  }

  return response.json() as Promise<RunReportResponse>;
};

const metricValue = (response: RunReportResponse) => Number(response.rows?.[0]?.metricValues?.[0]?.value || 0);

const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(value);

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'UTC' });
const monthYearFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

const parseAnalyticsDate = (value: string) => new Date(Date.UTC(
  Number(value.slice(0, 4)),
  Number(value.slice(4, 6)) - 1,
  Number(value.slice(6, 8)),
));

const dateKey = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}${month}${day}`;
};

const daysAgo = (days: number) => {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() - days);

  return date;
};

const formatChange = (current: number, previous: number) => {
  if (!previous) {
    return current > 0 ? '+100%' : '0%';
  }

  const change = Math.round(((current - previous) / previous) * 100);
  return `${change >= 0 ? '+' : ''}${change}%`;
};

const getMetricPair = async (accessToken: string, currentRange: { startDate: string; endDate: string }, previousRange: { startDate: string; endDate: string }) => {
  const [current, previous] = await Promise.all([
    runReport(accessToken, {
      dateRanges: [currentRange],
      metrics: [{ name: analyticsTrafficMetric }],
    }),
    runReport(accessToken, {
      dateRanges: [previousRange],
      metrics: [{ name: analyticsTrafficMetric }],
    }),
  ]);

  return {
    current: metricValue(current),
    previous: metricValue(previous),
  };
};

const getDailyRows = async (accessToken: string, startDate: string, endDate = 'today'): Promise<DailyPoint[]> => {
  const response = await runReport(accessToken, {
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'date' }],
    metrics: [{ name: analyticsTrafficMetric }],
    orderBys: [{ dimension: { dimensionName: 'date' } }],
    keepEmptyRows: true,
    limit: 100000,
  });

  return (response.rows || []).map((row) => ({
    date: row.dimensionValues?.[0]?.value || '',
    value: Number(row.metricValues?.[0]?.value || 0),
  })).filter((row) => row.date);
};

const groupChartPoints = (points: DailyPoint[], bucketCount: number, allTime = false): TrafficPoint[] => {
  if (!points.length) {
    return [];
  }

  if (points.length <= bucketCount) {
    return points.map((point) => {
      const date = parseAnalyticsDate(point.date);

      return {
        label: allTime ? monthYearFormatter.format(date) : dateFormatter.format(date),
        value: point.value,
      };
    });
  }

  const bucketSize = Math.ceil(points.length / bucketCount);
  const buckets: TrafficPoint[] = [];

  for (let index = 0; index < points.length; index += bucketSize) {
    const bucket = points.slice(index, index + bucketSize);
    const labelDate = parseAnalyticsDate(bucket[0].date);

    buckets.push({
      label: allTime ? monthYearFormatter.format(labelDate) : dateFormatter.format(labelDate),
      value: bucket.reduce((sum, point) => sum + point.value, 0),
    });
  }

  return buckets.slice(0, bucketCount);
};

const getRecentChart = async (accessToken: string, days: number): Promise<TrafficPoint[]> => {
  const rows = await getDailyRows(accessToken, `${days - 1}daysAgo`);
  const rowMap = new Map(rows.map((row) => [row.date, row.value]));
  const filledRows = Array.from({ length: days }, (_, index) => {
    const date = daysAgo(days - 1 - index);

    return {
      date: dateKey(date),
      value: rowMap.get(dateKey(date)) || 0,
    };
  });

  if (days === 7) {
    return filledRows.map((point) => ({
      label: weekdayFormatter.format(parseAnalyticsDate(point.date)),
      value: point.value,
    }));
  }

  return groupChartPoints(filledRows, 7);
};

const getAllTimeChart = async (accessToken: string): Promise<TrafficPoint[]> => {
  const rows = await getDailyRows(accessToken, '2020-01-01');

  return groupChartPoints(rows, 7, true);
};

const getCharts = async (accessToken: string): Promise<Record<TrafficChartRange, TrafficPoint[]>> => {
  const [sevenDays, thirtyDays, hundredDays, allTime] = await Promise.all([
    getRecentChart(accessToken, 7),
    getRecentChart(accessToken, 30),
    getRecentChart(accessToken, 100),
    getAllTimeChart(accessToken),
  ]);

  return {
    '7d': sevenDays.length ? sevenDays : fallbackAnalytics.charts['7d'],
    '30d': thirtyDays.length ? thirtyDays : fallbackAnalytics.charts['30d'],
    '100d': hundredDays.length ? hundredDays : fallbackAnalytics.charts['100d'],
    all: allTime.length ? allTime : fallbackAnalytics.charts.all,
  };
};

const getCountriesForRange = async (accessToken: string, startDate: string): Promise<CountryTraffic[]> => {
  const response = await runReport(accessToken, {
    dateRanges: [{ startDate, endDate: 'today' }],
    dimensions: [{ name: 'country' }, { name: 'countryId' }],
    metrics: [{ name: analyticsTrafficMetric }],
    orderBys: [{ metric: { metricName: analyticsTrafficMetric }, desc: true }],
    limit: 5,
  });
  const totalResponse = await runReport(accessToken, {
    dateRanges: [{ startDate, endDate: 'today' }],
    metrics: [{ name: analyticsTrafficMetric }],
  });
  const total = Math.max(metricValue(totalResponse), 1);
  const rows = response.rows || [];
  const countries = rows.map((row) => {
    const country = row.dimensionValues?.[0]?.value || 'Unknown';
    const countryCode = row.dimensionValues?.[1]?.value || '';
    const views = Number(row.metricValues?.[0]?.value || 0);
    return {
      country,
      countryCode,
      percent: Math.round((views / total) * 100),
    };
  });
  const usedPercent = countries.reduce((sum, country) => sum + country.percent, 0);

  return [
    ...countries,
    { countryCode: '', country: 'Others', percent: Math.max(0, 100 - usedPercent) },
  ];
};

const countryListScore = (countries: CountryTraffic[]) => {
  const tierScore = countries.reduce((score, country) => (
    topTierCountryCodes.has(country.countryCode) ? score + country.percent : score
  ), 0);
  const visibleMarketScore = countries
    .filter((country) => country.country !== 'Others')
    .reduce((score, country) => score + country.percent, 0);

  return tierScore * 10 + visibleMarketScore;
};

const getCountries = async (accessToken: string): Promise<CountryTraffic[]> => {
  const ranges: Array<{ startDate: string }> = [
    { startDate: '29daysAgo' },
    { startDate: '59daysAgo' },
    { startDate: '180daysAgo' },
    { startDate: '89daysAgo' },
    { startDate: '2020-01-01' },
  ];
  const countryLists = await Promise.all(ranges.map(({ startDate }) => getCountriesForRange(accessToken, startDate)));
  const bestCountries = countryLists.reduce((best, current) => (
    countryListScore(current) > countryListScore(best) ? current : best
  ), countryLists[0] || fallbackAnalytics.countries);

  return bestCountries.length ? bestCountries : fallbackAnalytics.countries;
};

export const getTrafficAnalytics = async (): Promise<TrafficAnalytics> => {
  if (!process.env.GOOGLE_ANALYTICS_PROPERTY_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
    return fallbackAnalytics;
  }

  try {
    const accessToken = await getAccessToken();
    const [realtime, today, thirtyDays, allTime, charts, countries] = await Promise.all([
      runRealtimeUsersReport(accessToken),
      getMetricPair(
        accessToken,
        { startDate: 'today', endDate: 'today' },
        { startDate: 'yesterday', endDate: 'yesterday' },
      ),
      getMetricPair(
        accessToken,
        { startDate: '29daysAgo', endDate: 'today' },
        { startDate: '59daysAgo', endDate: '30daysAgo' },
      ),
      runReport(accessToken, {
        dateRanges: [{ startDate: '2020-01-01', endDate: 'today' }],
        metrics: [{ name: analyticsTrafficMetric }],
      }),
      getCharts(accessToken),
      getCountries(accessToken),
    ]);

    return {
      source: 'google_analytics',
      realtimeUsers: metricValue(realtime),
      metrics: [
        { value: formatNumber(today.current), label: 'visitors today', change: formatChange(today.current, today.previous) },
        { value: formatNumber(thirtyDays.current), label: 'visitors - Last 30 Days', change: formatChange(thirtyDays.current, thirtyDays.previous) },
        { value: formatNumber(metricValue(allTime)), label: 'visitors - All Time', change: formatChange(metricValue(allTime), thirtyDays.previous) },
      ],
      charts,
      countries,
    };
  } catch (error) {
    console.error(error);
    return fallbackAnalytics;
  }
};
