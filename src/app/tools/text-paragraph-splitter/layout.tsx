import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Paragraph Splitter - Split Text into Paragraphs Online Free',
  description: 'Free online text paragraph splitter tool. Split long text into well-formatted paragraphs by word count, sentences, or custom chunks. Perfect for content creators, writers, and SEO professionals.',
  keywords: [
    'text paragraph splitter',
    'split text into paragraphs',
    'paragraph formatter',
    'text splitter online',
    'paragraph generator',
    'text formatting tool',
    'content formatting',
    'paragraph breaker',
    'text organizer',
    'paragraph creator',
    'text structure tool',
    'content splitter',
    'paragraph divider',
    'text paragraph tool',
    'free text splitter'
  ],
  openGraph: {
    title: 'Text Paragraph Splitter - Split Text into Paragraphs Online Free',
    description: 'Transform long text into perfectly formatted paragraphs. Split by word count, sentences, or chunks with advanced formatting options. Free online tool.',
    type: 'website',
    url: '/tools/text-paragraph-splitter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Paragraph Splitter - Split Text into Paragraphs Online Free',
    description: 'Transform long text into perfectly formatted paragraphs. Split by word count, sentences, or chunks with advanced formatting options.',
  },
  alternates: {
    canonical: '/tools/text-paragraph-splitter',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TextParagraphSplitterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}