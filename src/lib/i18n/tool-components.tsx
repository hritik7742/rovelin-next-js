"use client";

import React from 'react';
import ImageConverter from '@/app/tools/image-converter/page';
import JpgToPng from '@/app/tools/jpg-to-png/page';
import PngToJpg from '@/app/tools/png-to-jpg/page';
import WebpToJpg from '@/app/tools/webp-to-jpg/page';
import HeicToJpg from '@/app/tools/heic-to-jpg/page';
import SvgConverter from '@/app/tools/svg-converter/page';
import ImageToPdf from '@/app/tools/image-to-pdf/page';
import PdfToJpg from '@/app/tools/pdf-to-jpg/page';
import PdfToPng from '@/app/tools/pdf-to-png/page';
import ImageResizer from '@/app/tools/image-resizer/page';
import ImageCropper from '@/app/tools/image-cropper/page';
import ImageCompressor from '@/app/tools/image-compressor/page';
import WebpCompressor from '@/app/tools/webp-compressor/page';
import PngCompressor from '@/app/tools/png-compressor/page';
import JpegCompressor from '@/app/tools/jpeg-compressor/page';
import GifCompressor from '@/app/tools/gif-compressor/page';
import ColorPicker from '@/app/tools/color-picker/page';
import Base64Image from '@/app/tools/base64-image/page';
import VideoCompressor from '@/app/tools/video-compressor/page';
import EmojiGenerator from '@/app/tools/emoji-generator/page';
import GradientGenerator from '@/app/tools/gradient-generator/page';
import VideoToAudio from '@/app/tools/video-to-audio/page';
import ImageToText from '@/app/tools/image-to-text/page';
import QrGenerator from '@/app/tools/qr-generator/page';
import Base64Converter from '@/app/tools/base64-converter/page';
import CssMinifier from '@/app/tools/css-minifier/page';
import UrlEncoderDecoder from '@/app/tools/url-encoder-decoder/page';
import PasswordGenerator from '@/app/tools/password-generator/page';
import TextDiff from '@/app/tools/text-diff/page';
import PhoneGenerator from '@/app/tools/phone-generator/page';
import LoremGenerator from '@/app/tools/lorem-generator/page';
import CommaSeparator from '@/app/tools/comma-separator/page';
import RandomNameGenerator from '@/app/tools/random-name-generator/page';
import MarkdownToHtml from '@/app/tools/markdown-to-html/page';
import WordCounter from '@/app/tools/word-counter/page';
import CreditCardGenerator from '@/app/tools/credit-card-generator/page';
import JsMinifier from '@/app/tools/js-minifier/page';
import WordToPdf from '@/app/tools/word-to-pdf/page';
import UnitConverter from '@/app/tools/unit-converter/page';
import NameWheel from '@/app/tools/name-wheel/page';
import ArchiveConverter from '@/app/tools/archive-converter/page';
import PdfToWord from '@/app/tools/pdf-to-word/page';
import EmailExtractor from '@/app/tools/email-extractor/page';
import PhoneNumberExtractor from '@/app/tools/phone-number-extractor/page';
import DigitalSignature from '@/app/tools/digital-signature/page';
import PdfTools from '@/app/tools/pdf-tools/page';
import JsonFormatter from '@/app/tools/json-formatter/page';
import HtmlFormatter from '@/app/tools/html-formatter/page';
import TextParagraphSplitter from '@/app/tools/text-paragraph-splitter/page';
import BlogGenerator from '@/app/tools/blog-generator/page';

export const TOOL_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'image-converter': ImageConverter,
  'jpg-to-png': JpgToPng,
  'png-to-jpg': PngToJpg,
  'webp-to-jpg': WebpToJpg,
  'heic-to-jpg': HeicToJpg,
  'svg-converter': SvgConverter,
  'image-to-pdf': ImageToPdf,
  'pdf-to-jpg': PdfToJpg,
  'pdf-to-png': PdfToPng,
  'image-resizer': ImageResizer,
  'image-cropper': ImageCropper,
  'image-compressor': ImageCompressor,
  'webp-compressor': WebpCompressor,
  'png-compressor': PngCompressor,
  'jpeg-compressor': JpegCompressor,
  'gif-compressor': GifCompressor,
  'color-picker': ColorPicker,
  'base64-image': Base64Image,
  'video-compressor': VideoCompressor,
  'emoji-generator': EmojiGenerator,
  'gradient-generator': GradientGenerator,
  'video-to-audio': VideoToAudio,
  'image-to-text': ImageToText,
  'qr-generator': QrGenerator,
  'base64-converter': Base64Converter,
  'css-minifier': CssMinifier,
  'url-encoder-decoder': UrlEncoderDecoder,
  'password-generator': PasswordGenerator,
  'text-diff': TextDiff,
  'phone-generator': PhoneGenerator,
  'lorem-generator': LoremGenerator,
  'comma-separator': CommaSeparator,
  'random-name-generator': RandomNameGenerator,
  'markdown-to-html': MarkdownToHtml,
  'word-counter': WordCounter,
  'credit-card-generator': CreditCardGenerator,
  'js-minifier': JsMinifier,
  'word-to-pdf': WordToPdf,
  'unit-converter': UnitConverter,
  'name-wheel': NameWheel,
  'archive-converter': ArchiveConverter,
  'pdf-to-word': PdfToWord,
  'email-extractor': EmailExtractor,
  'phone-number-extractor': PhoneNumberExtractor,
  'digital-signature': DigitalSignature,
  'pdf-tools': PdfTools,
  'json-formatter': JsonFormatter,
  'html-formatter': HtmlFormatter,
  'text-paragraph-splitter': TextParagraphSplitter,
  'blog-generator': BlogGenerator
};

export function getToolComponent(slug: string): React.ComponentType<any> | undefined {
  return TOOL_COMPONENTS[slug];
}
