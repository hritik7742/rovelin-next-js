"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-12 min-h-[300px]">
    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const TOOL_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'archive-converter': dynamic(() => import('@/app/tools/archive-converter/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'base64-converter': dynamic(() => import('@/app/tools/base64-converter/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'base64-image': dynamic(() => import('@/app/tools/base64-image/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'blog-generator': dynamic(() => import('@/app/tools/blog-generator/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'color-picker': dynamic(() => import('@/app/tools/color-picker/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'comma-separator': dynamic(() => import('@/app/tools/comma-separator/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'credit-card-generator': dynamic(() => import('@/app/tools/credit-card-generator/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'css-minifier': dynamic(() => import('@/app/tools/css-minifier/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'digital-signature': dynamic(() => import('@/app/tools/digital-signature/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'email-extractor': dynamic(() => import('@/app/tools/email-extractor/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'emoji-generator': dynamic(() => import('@/app/tools/emoji-generator/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'gif-compressor': dynamic(() => import('@/app/tools/gif-compressor/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'heic-to-jpg': dynamic(() => import('@/app/tools/heic-to-jpg/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'html-formatter': dynamic(() => import('@/app/tools/html-formatter/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'image-compressor': dynamic(() => import('@/app/tools/image-compressor/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'image-converter': dynamic(() => import('@/app/tools/image-converter/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'image-cropper': dynamic(() => import('@/app/tools/image-cropper/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'image-resizer': dynamic(() => import('@/app/tools/image-resizer/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'image-to-pdf': dynamic(() => import('@/app/tools/image-to-pdf/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'image-to-text': dynamic(() => import('@/app/tools/image-to-text/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'jpeg-compressor': dynamic(() => import('@/app/tools/jpeg-compressor/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'jpg-to-png': dynamic(() => import('@/app/tools/jpg-to-png/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'js-minifier': dynamic(() => import('@/app/tools/js-minifier/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'json-formatter': dynamic(() => import('@/app/tools/json-formatter/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'lorem-generator': dynamic(() => import('@/app/tools/lorem-generator/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'markdown-to-html': dynamic(() => import('@/app/tools/markdown-to-html/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'name-wheel': dynamic(() => import('@/app/tools/name-wheel/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'password-generator': dynamic(() => import('@/app/tools/password-generator/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'pdf-to-jpg': dynamic(() => import('@/app/tools/pdf-to-jpg/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'pdf-to-png': dynamic(() => import('@/app/tools/pdf-to-png/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'phone-generator': dynamic(() => import('@/app/tools/phone-generator/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'phone-number-extractor': dynamic(() => import('@/app/tools/phone-number-extractor/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'png-compressor': dynamic(() => import('@/app/tools/png-compressor/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'png-to-jpg': dynamic(() => import('@/app/tools/png-to-jpg/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'qr-generator': dynamic(() => import('@/app/tools/qr-generator/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'random-name-generator': dynamic(() => import('@/app/tools/random-name-generator/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'svg-converter': dynamic(() => import('@/app/tools/svg-converter/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'text-diff': dynamic(() => import('@/app/tools/text-diff/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'text-paragraph-splitter': dynamic(() => import('@/app/tools/text-paragraph-splitter/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'unit-converter': dynamic(() => import('@/app/tools/unit-converter/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'url-encoder-decoder': dynamic(() => import('@/app/tools/url-encoder-decoder/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'video-compressor': dynamic(() => import('@/app/tools/video-compressor/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'video-to-audio': dynamic(() => import('@/app/tools/video-to-audio/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'webp-compressor': dynamic(() => import('@/app/tools/webp-compressor/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'webp-to-jpg': dynamic(() => import('@/app/tools/webp-to-jpg/page'), { loading: () => <LoadingFallback />, ssr: false }),
  'word-counter': dynamic(() => import('@/app/tools/word-counter/page'), { loading: () => <LoadingFallback />, ssr: false }),
};

export function getToolComponent(slug: string): React.ComponentType<any> | undefined {
  return TOOL_COMPONENTS[slug];
}
