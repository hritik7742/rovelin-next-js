export interface ToolDefinition {
  slug: string;
  name: string;
  category: string;
  applicationCategory: string;
  title: string;
  description: string;
  keywords: string;
}

export const TOOLS_REGISTRY: ToolDefinition[] = [
  {
    "slug": "archive-converter",
    "name": "Archive Converter",
    "category": "Utility Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Free Online Archive Converter | Convert ZIP, RAR, 7Z, TAR, GZ",
    "description": "Convert archive files between formats including ZIP, RAR, 7Z, TAR, and GZ. Free online tool with no file size limits.",
    "keywords": "archive converter, zip converter, rar converter, 7z converter, tar converter, gz converter, online archive tool"
  },
  {
    "slug": "base64-converter",
    "name": "Base64 Converter",
    "category": "Developer Tools",
    "applicationCategory": "DeveloperApplication",
    "title": "Free Base64 Encoder Decoder - Convert Text & Files to Base64 Online",
    "description": "Encode and decode Base64 strings online for free. Convert text, files, and images to Base64 encoding. Perfect for developers and data encoding needs.",
    "keywords": "base64 converter, online base64 converter, free base64 converter"
  },
  {
    "slug": "base64-image",
    "name": "Base64 Image",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Base64 Image Converter | Free Online Tool",
    "description": "Convert images to Base64 strings and vice versa. Perfect for embedding images in CSS, HTML, or JSON data.",
    "keywords": "base64 image converter, image to base64, base64 to image, data URI converter, image encoder"
  },
  {
    "slug": "blog-generator",
    "name": "Blog Generator",
    "category": "Generator Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Free Blog Generator | Online Tool",
    "description": "Free online blog generator tool. Fast, secure, and easy to use directly in your browser.",
    "keywords": "blog generator, online blog generator, free blog generator"
  },
  {
    "slug": "color-picker",
    "name": "Color Picker",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free Color Picker Tool | Online Color Selection",
    "description": "Pick colors, generate palettes, and convert between color formats (HEX, RGB, HSL) with our free online color picker tool.",
    "keywords": "color picker, color palette, hex color, rgb color, hsl color"
  },
  {
    "slug": "comma-separator",
    "name": "Comma Separator",
    "category": "Text Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Free Online Comma Separator Tool | Text Separator & Joiner",
    "description": "Free online comma separator tool to easily separate, join, and format text with custom delimiters. Convert lists between different separators, clean data, and prepare CSV files.",
    "keywords": "comma separator, text separator, csv formatter, comma to line break, line break to comma, text formatter, list formatter, data cleaner"
  },
  {
    "slug": "credit-card-generator",
    "name": "Credit Card Generator",
    "category": "Generator Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Credit Card Generator | Generate Test Credit Card Numbers",
    "description": "Generate valid test credit card numbers for testing purposes. Supports Visa, Mastercard, American Express, Discover, and JCB. Perfect for development and testing.",
    "keywords": "credit card generator, test credit cards, fake credit card numbers, card number generator, test card numbers, development testing cards"
  },
  {
    "slug": "css-minifier",
    "name": "CSS Minifier",
    "category": "Developer Tools",
    "applicationCategory": "DeveloperApplication",
    "title": "Free CSS Minifier | Online CSS Compressor Tool",
    "description": "Minify and compress your CSS code online. Reduce file size and improve website performance with our free CSS minifier tool.",
    "keywords": "css minifier, css compressor, minify css, compress css, css optimizer, css tool, web performance"
  },
  {
    "slug": "digital-signature",
    "name": "Digital Signature",
    "category": "Generator Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Free Digital Signature Generator | Draw or Type Signatures",
    "description": "Create professional digital signatures online. Draw with your mouse/touch or type your signature. Download in multiple formats. Free, secure, and easy to use.",
    "keywords": "digital signature generator, electronic signature maker, free signature creator, online signature tool, draw signature online, signature maker"
  },
  {
    "slug": "email-extractor",
    "name": "Email Extractor",
    "category": "Text Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Email Extractor | Extract Emails from Text & Files",
    "description": "Free online email extractor tool. Extract email addresses from text, documents, and files. Find and collect email addresses quickly with our advanced email finder.",
    "keywords": "email extractor, email finder, extract email addresses, email harvester, email scraper, find emails in text, email address extractor, email mining tool, extract emails from text"
  },
  {
    "slug": "emoji-generator",
    "name": "Emoji Generator",
    "category": "Generator Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Emoji Generator | Find Perfect Emojis for Every Mood",
    "description": "Generate perfect emojis based on your mood or description. Copy and use emojis for social media, messages, or any digital communication.",
    "keywords": "emoji generator, mood emoji, emoji finder, emoji search, copy emoji"
  },
  {
    "slug": "gif-compressor",
    "name": "Gif Compressor",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free Gif Compressor | Online Tool",
    "description": "Free online gif compressor tool. Fast, secure, and easy to use directly in your browser.",
    "keywords": "gif compressor, online gif compressor, free gif compressor"
  },
  {
    "slug": "heic-to-jpg",
    "name": "HEIC To JPG",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "HEIC to JPG Converter - Convert iPhone Photos Online | Free Tool",
    "description": "Convert HEIC/HEIF images from iPhone to JPG or PNG format online. Fast, secure, and free. Supports batch conversion with quality control.",
    "keywords": "heic to jpg, convert heic to jpg, iphone photo converter, heic converter, heif to jpg, heic to png"
  },
  {
    "slug": "html-formatter",
    "name": "HTML Formatter",
    "category": "Developer Tools",
    "applicationCategory": "DeveloperApplication",
    "title": "Free HTML Formatter & Beautifier | Online HTML Code Formatter",
    "description": "Format and beautify your HTML code with our free online HTML formatter. Make your HTML readable and properly indented.",
    "keywords": "html formatter, html beautifier, format html, pretty print html, html indentation, html validator"
  },
  {
    "slug": "image-compressor",
    "name": "Image Compressor",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free Image Compressor | Optimize & Compress Images Online",
    "description": "Compress and optimize images online for free. Reduce file sizes while maintaining quality. Supports JPG, PNG, WebP, GIF. Batch processing and instant preview.",
    "keywords": "image compressor, compress images, optimize images, reduce image size, image optimizer, batch compress, JPG compressor, PNG compressor, WebP compressor"
  },
  {
    "slug": "image-converter",
    "name": "Image Converter",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free Universal Image Converter | JPG, PNG, WebP, PDF, HEIC Converter",
    "description": "Convert images between JPG, PNG, WebP, PDF, HEIC, and SVG formats online. Free tool with no file size limits.",
    "keywords": "image converter, jpg to png, png to jpg, webp converter, pdf converter, heic to jpg, svg converter"
  },
  {
    "slug": "image-cropper",
    "name": "Image Cropper",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free Online Image Cropper | Shape Cropping Tool",
    "description": "Crop images into various shapes including circle, heart, star, and more. Free online image cropping tool with advanced features.",
    "keywords": "image cropper, photo crop tool, circle crop, shape cropper, image editor"
  },
  {
    "slug": "image-resizer",
    "name": "Image Resizer",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free Online Image Resizer | Resize Images to Exact Dimensions",
    "description": "Resize images to common dimensions like 16x16, 32x32, 48x48, 128x128 pixels. Perfect for icons, avatars, and social media images. Free online tool with instant download.",
    "keywords": "image resizer, resize 16x16, 32x32 icon, 48x48 favicon, 128x128 logo, pixel perfect resize"
  },
  {
    "slug": "image-to-pdf",
    "name": "Image To PDF",
    "category": "PDF Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Image to PDF Converter",
    "description": "Convert multiple images into a single PDF document. Upload JPG, PNG, GIF, WebP, BMP images and create PDF files.",
    "keywords": "image to pdf, online image to pdf, free image to pdf"
  },
  {
    "slug": "image-to-text",
    "name": "Image To Text",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free Online Image to Text Converter (OCR) - Extract Text from Images",
    "description": "Convert images to text with our free online OCR tool. Support for 35+ languages including English, Chinese, Japanese, Korean, Hindi & Arabic. Extract text from images, scanned documents & PDFs.",
    "keywords": "image to text, online image to text, free image to text"
  },
  {
    "slug": "jpeg-compressor",
    "name": "Jpeg Compressor",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free Jpeg Compressor | Online Tool",
    "description": "Free online jpeg compressor tool. Fast, secure, and easy to use directly in your browser.",
    "keywords": "jpeg compressor, online jpeg compressor, free jpeg compressor"
  },
  {
    "slug": "jpg-to-png",
    "name": "JPG To PNG",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free JPG To PNG | Online Tool",
    "description": "Free online jpg to png tool. Fast, secure, and easy to use directly in your browser.",
    "keywords": "jpg to png, online jpg to png, free jpg to png"
  },
  {
    "slug": "js-minifier",
    "name": "JS Minifier",
    "category": "Developer Tools",
    "applicationCategory": "DeveloperApplication",
    "title": "JavaScript & Library Minifier | Free Online JS Compression Tool",
    "description": "Free online JavaScript minifier and compressor. Optimize React, jQuery, Node.js, Express.js and other JS libraries. Reduce file size and improve load times.",
    "keywords": "javascript minifier, react minifier, jquery minifier, node.js optimizer, express.js compressor, js compression tool"
  },
  {
    "slug": "json-formatter",
    "name": "JSon Formatter",
    "category": "Developer Tools",
    "applicationCategory": "DeveloperApplication",
    "title": "Free JSON Formatter & Validator | Online JSON Beautifier Tool",
    "description": "Format, validate and beautify your JSON data with our free online JSON formatter tool. Make your JSON readable and find syntax errors easily.",
    "keywords": "json formatter, json validator, json beautifier, format json, pretty print json, json parser"
  },
  {
    "slug": "lorem-generator",
    "name": "Lorem Generator",
    "category": "Text Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Lorem Ipsum Generator | Generate Random Text for Design & Development",
    "description": "Free Lorem Ipsum generator tool. Create placeholder text for web design, graphic design, and content mockups. Customize length, format, and style.",
    "keywords": "lorem ipsum generator, placeholder text generator, dummy text generator, latin text generator, web design text, mockup content generator"
  },
  {
    "slug": "markdown-to-html",
    "name": "Markdown To HTML",
    "category": "Text Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Markdown to HTML Converter | Free Online Tool",
    "description": "Free online Markdown to HTML converter. Transform Markdown to clean HTML instantly. Perfect for blogs, documentation, and web content. No registration required.",
    "keywords": "markdown to html, md to html converter, markdown converter, online markdown editor, markdown to html converter, markdown parser, html generator, markdown tool, free markdown converter"
  },
  {
    "slug": "name-wheel",
    "name": "Name Wheel",
    "category": "Generator Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Free Online Name Wheel Spinner & Random Name Picker Tool",
    "description": "Free online random name picker and wheel spinner. Perfect for classroom activities, team selection, prize drawings, and decision making. No registration required.",
    "keywords": "name wheel, random name picker, wheel spinner, classroom tool, team picker, random selector"
  },
  {
    "slug": "password-generator",
    "name": "Password Generator",
    "category": "Generator Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Free Password Generator Tool | Create Strong & Secure Passwords",
    "description": "Generate strong, secure, and random passwords with our free password generator tool. Create passwords with custom length, symbols, numbers, and more.",
    "keywords": "password generator, strong password, secure password, random password generator, password creator"
  },
  {
    "slug": "pdf-to-jpg",
    "name": "PDF To JPG",
    "category": "PDF Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "PDF to JPG Converter",
    "description": "Convert PDF pages to high-quality JPG images with customizable quality settings",
    "keywords": "pdf to jpg, online pdf to jpg, free pdf to jpg"
  },
  {
    "slug": "pdf-to-png",
    "name": "PDF To PNG",
    "category": "PDF Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "PDF to PNG Converter",
    "description": "Convert PDF pages to high-quality PNG images",
    "keywords": "pdf to png, online pdf to png, free pdf to png"
  },
  {
    "slug": "phone-generator",
    "name": "Phone Generator",
    "category": "Generator Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Random Phone Number Generator | Generate Phone Numbers by Country",
    "description": "Generate random phone numbers for different countries. Perfect for testing, development, and data sampling. Supports US, UK, India, and more.",
    "keywords": "phone number generator, random phone numbers, test phone numbers, international phone numbers, phone number format"
  },
  {
    "slug": "phone-number-extractor",
    "name": "Phone Number Extractor",
    "category": "Text Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Phone Number Extractor | Extract Phone Numbers from Text",
    "description": "Free online tool to extract phone numbers from text. Supports international formats, validates numbers, and removes duplicates. Perfect for contact list management.",
    "keywords": "phone number extractor, extract phone numbers, phone number finder, contact extractor, phone number scraper"
  },
  {
    "slug": "png-compressor",
    "name": "PNG Compressor",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free PNG Compressor | Online Tool",
    "description": "Free online png compressor tool. Fast, secure, and easy to use directly in your browser.",
    "keywords": "png compressor, online png compressor, free png compressor"
  },
  {
    "slug": "png-to-jpg",
    "name": "PNG To JPG",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free PNG To JPG | Online Tool",
    "description": "Free online png to jpg tool. Fast, secure, and easy to use directly in your browser.",
    "keywords": "png to jpg, online png to jpg, free png to jpg"
  },
  {
    "slug": "qr-generator",
    "name": "QR Generator",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free QR Code Generator | Create Custom QR Codes Online",
    "description": "Generate custom QR codes for URLs, text, contact info, and more. Create professional QR codes with custom colors and sizes.",
    "keywords": "qr code generator, create qr code, custom qr code, qr code maker, free qr code"
  },
  {
    "slug": "random-name-generator",
    "name": "Random Name Generator",
    "category": "Generator Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Random Name Generator | Generate Names for Characters & Projects",
    "description": "Generate random names for characters, projects, or any creative needs. Features multiple name styles and customization options.",
    "keywords": "random name generator, name generator, character names, project names, fantasy names"
  },
  {
    "slug": "svg-converter",
    "name": "SVG Converter",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free SVG Converter | Online Tool",
    "description": "Free online svg converter tool. Fast, secure, and easy to use directly in your browser.",
    "keywords": "svg converter, online svg converter, free svg converter"
  },
  {
    "slug": "text-diff",
    "name": "Text Diff",
    "category": "Text Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Free Text Diff Tool | Compare Text Online",
    "description": "Compare two texts and find differences with our free online text diff tool. Easily spot changes, additions, and deletions.",
    "keywords": "text diff, text compare, diff checker, text difference, compare text online"
  },
  {
    "slug": "text-paragraph-splitter",
    "name": "Text Paragraph Splitter",
    "category": "Text Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Text Paragraph Splitter - Split Text into Paragraphs Online Free",
    "description": "Free online text paragraph splitter tool. Split long text into well-formatted paragraphs by word count, sentences, or custom chunks. Perfect for content creators, writers, and SEO professionals.",
    "keywords": "text paragraph splitter, online text paragraph splitter, free text paragraph splitter"
  },
  {
    "slug": "unit-converter",
    "name": "Unit Converter",
    "category": "Utility Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Unit Converter | Convert Length, Temperature, Area, Volume & More",
    "description": "Free online unit converter. Convert between different units of measurement including length, temperature, area, volume, weight, and time. Quick and accurate conversions.",
    "keywords": "unit converter, measurement converter, length converter, temperature converter, area converter, volume converter, weight converter, time converter"
  },
  {
    "slug": "url-encoder-decoder",
    "name": "URL Encoder Decoder",
    "category": "Developer Tools",
    "applicationCategory": "DeveloperApplication",
    "title": "Free URL Encoder Decoder - Encode & Decode URLs Online",
    "description": "Encode and decode URLs online for free. Convert special characters, spaces, and symbols for web-safe URLs. Perfect for developers and web professionals.",
    "keywords": "url encoder decoder, online url encoder decoder, free url encoder decoder"
  },
  {
    "slug": "video-compressor",
    "name": "Video Compressor",
    "category": "Media Tools",
    "applicationCategory": "MultimediaApplication",
    "title": "Free Online Video Compressor - Reduce Video File Size",
    "description": "Compress videos online for free while maintaining quality. Perfect for social media, email sharing, and websites. No upload required - works in your browser.",
    "keywords": "video compressor, online video compressor, free video compressor"
  },
  {
    "slug": "video-to-audio",
    "name": "Video To Audio",
    "category": "Media Tools",
    "applicationCategory": "MultimediaApplication",
    "title": "Free Video to Audio Converter - Extract Audio from Video Online",
    "description": "Convert video files to audio formats online for free. Extract MP3, WAV, AAC, or OGG audio from MP4, MOV, AVI videos. High-quality conversion in your browser.",
    "keywords": "video to audio, online video to audio, free video to audio"
  },
  {
    "slug": "webp-compressor",
    "name": "WebP Compressor",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free WebP Compressor | Online Tool",
    "description": "Free online webp compressor tool. Fast, secure, and easy to use directly in your browser.",
    "keywords": "webp compressor, online webp compressor, free webp compressor"
  },
  {
    "slug": "webp-to-jpg",
    "name": "WebP To JPG",
    "category": "Image Tools",
    "applicationCategory": "PhotoEditor",
    "title": "Free WebP To JPG | Online Tool",
    "description": "Free online webp to jpg tool. Fast, secure, and easy to use directly in your browser.",
    "keywords": "webp to jpg, online webp to jpg, free webp to jpg"
  },
  {
    "slug": "word-counter",
    "name": "Word Counter",
    "category": "Text Tools",
    "applicationCategory": "UtilitiesApplication",
    "title": "Free Word Counter | Count Words, Characters, Sentences & Paragraphs",
    "description": "Free online word counter tool. Count words, characters, sentences, and paragraphs. Perfect for essays, articles, and content writing. Includes reading time estimation.",
    "keywords": "word counter, character count, sentence counter, paragraph counter, text analyzer, reading time calculator, word count tool"
  }
];

export const TOOLS_MAP = new Map<string, ToolDefinition>(
  TOOLS_REGISTRY.map(t => [t.slug, t])
);

export function getToolDefinition(slug: string): ToolDefinition | undefined {
  return TOOLS_MAP.get(slug);
}

export function getAllToolSlugs(): string[] {
  return TOOLS_REGISTRY.map(t => t.slug);
}
