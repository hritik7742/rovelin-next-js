export interface CatalogTool {
  slug: string;
  name: string;
  description: string;
  category: 'Image Tools' | 'Text Tools';
  iconName: string;
}

export const TOOLS_CATALOG: CatalogTool[] = [
  { slug: 'image-converter', name: 'Image Converter', description: 'Convert between JPG, PNG, WebP, PDF, HEIC, SVG formats', category: 'Image Tools', iconName: 'Image' },
  { slug: 'jpg-to-png', name: 'JPG to PNG Converter', description: 'Convert JPG images to PNG format with transparency', category: 'Image Tools', iconName: 'FileImage' },
  { slug: 'png-to-jpg', name: 'PNG to JPG Converter', description: 'Convert PNG images to JPG format with compression', category: 'Image Tools', iconName: 'FileImage' },
  { slug: 'webp-to-jpg', name: 'WebP to JPG Converter', description: 'Convert WebP images to JPG format for compatibility', category: 'Image Tools', iconName: 'Files' },
  { slug: 'heic-to-jpg', name: 'HEIC to JPG Converter', description: 'Convert iPhone HEIC photos to JPG format', category: 'Image Tools', iconName: 'FileImage' },
  { slug: 'svg-converter', name: 'SVG Converter', description: 'Convert SVG files to PNG/JPG or vice versa', category: 'Image Tools', iconName: 'FileCode' },
  { slug: 'image-to-pdf', name: 'Image to PDF Converter', description: 'Convert images to PDF format easily', category: 'Image Tools', iconName: 'FileText' },
  { slug: 'pdf-to-jpg', name: 'PDF to JPG Converter', description: 'Convert PDF files to JPG images', category: 'Image Tools', iconName: 'FileImage' },
  { slug: 'pdf-to-png', name: 'PDF to PNG Converter', description: 'Convert PDF files to PNG images', category: 'Image Tools', iconName: 'FileDown' },
  { slug: 'image-resizer', name: 'Image Resizer', description: 'Resize images to exact dimensions while maintaining quality', category: 'Image Tools', iconName: 'Ruler' },
  { slug: 'image-cropper', name: 'Image Cropper', description: 'Crop images with precision and custom aspect ratios', category: 'Image Tools', iconName: 'Crop' },
  { slug: 'image-compressor', name: 'Image Compressor', description: 'Compress and optimize images', category: 'Image Tools', iconName: 'Package' },
  { slug: 'webp-compressor', name: 'WebP Compressor', description: 'Compress WebP images efficiently while maintaining quality', category: 'Image Tools', iconName: 'Package' },
  { slug: 'png-compressor', name: 'PNG Compressor', description: 'Compress PNG images while preserving transparency', category: 'Image Tools', iconName: 'Package' },
  { slug: 'jpeg-compressor', name: 'JPEG Compressor', description: 'Compress JPEG/JPG images with advanced optimization', category: 'Image Tools', iconName: 'Package' },
  { slug: 'gif-compressor', name: 'GIF Compressor', description: 'Compress GIF images and animations effectively', category: 'Image Tools', iconName: 'Package' },
  { slug: 'color-picker', name: 'Color Picker', description: 'Pick colors and create custom color palettes', category: 'Image Tools', iconName: 'Palette' },
  { slug: 'base64-image', name: 'Base64 Image Converter', description: 'Convert images to Base64 and vice versa', category: 'Image Tools', iconName: 'FileImage' },
  { slug: 'video-compressor', name: 'Video Compressor', description: 'Compress video files while maintaining quality', category: 'Image Tools', iconName: 'FileText' },
  { slug: 'emoji-generator', name: 'Emoji Generator', description: 'Generate perfect emojis based on mood or description', category: 'Image Tools', iconName: 'FileText' },
  { slug: 'gradient-generator', name: 'Gradient Generator', description: 'Create beautiful CSS gradients with 150+ presets', category: 'Image Tools', iconName: 'Palette' },
  { slug: 'video-to-audio', name: 'Video to Audio Converter', description: 'Extract audio from video files', category: 'Image Tools', iconName: 'FileText' },
  { slug: 'image-to-text', name: 'Image to Text (OCR)', description: 'Extract text from images in multiple languages', category: 'Image Tools', iconName: 'FileType' },
  { slug: 'qr-generator', name: 'QR Code Generator', description: 'Create customizable QR codes', category: 'Image Tools', iconName: 'QrCode' },
  { slug: 'base64-converter', name: 'Base64 Converter', description: 'Convert text and files to/from Base64 encoding', category: 'Text Tools', iconName: 'Binary' },
  { slug: 'css-minifier', name: 'CSS Minifier', description: 'Minify CSS code to reduce file size', category: 'Text Tools', iconName: 'Hash' },
  { slug: 'url-encoder-decoder', name: 'URL Encoder/Decoder', description: 'Encode and decode URLs for safe transmission', category: 'Text Tools', iconName: 'LinkIcon' },
  { slug: 'password-generator', name: 'Password Generator', description: 'Generate secure random passwords', category: 'Text Tools', iconName: 'Lock' },
  { slug: 'text-diff', name: 'Text Diff Checker', description: 'Compare two texts and find differences', category: 'Text Tools', iconName: 'DiffIcon' },
  { slug: 'phone-generator', name: 'Phone Number Generator', description: 'Generate random phone numbers for different countries', category: 'Text Tools', iconName: 'Smartphone' },
  { slug: 'lorem-generator', name: 'Lorem Ipsum Generator', description: 'Generate professional placeholder text', category: 'Text Tools', iconName: 'Type' },
  { slug: 'comma-separator', name: 'Comma Separator', description: 'Convert between different text separators', category: 'Text Tools', iconName: 'ListIcon' },
  { slug: 'random-name-generator', name: 'Random Name Generator', description: 'Generate unique names from different cultures', category: 'Text Tools', iconName: 'User' },
  { slug: 'markdown-to-html', name: 'Markdown to HTML', description: 'Convert Markdown to clean, valid HTML code', category: 'Text Tools', iconName: 'FileCode' },
  { slug: 'word-counter', name: 'Word Counter', description: 'Count words, characters, sentences, and paragraphs', category: 'Text Tools', iconName: 'FileText' },
  { slug: 'credit-card-generator', name: 'Credit Card Generator', description: 'Generate test credit card numbers with realistic preview', category: 'Text Tools', iconName: 'FileText' },
  { slug: 'js-minifier', name: 'JavaScript Minifier', description: 'Minify and compress JavaScript code', category: 'Text Tools', iconName: 'FileCode' },
  { slug: 'word-to-pdf', name: 'Word to PDF Converter', description: 'Convert Word documents to PDF format', category: 'Text Tools', iconName: 'FileText' },
  { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert between different units of measurement', category: 'Text Tools', iconName: 'Ruler' },
  { slug: 'name-wheel', name: 'Name Wheel Spinner', description: 'Randomly select names with an interactive spinning wheel', category: 'Text Tools', iconName: 'RefreshCw' },
  { slug: 'archive-converter', name: 'Archive Converter', description: 'Convert between ZIP, RAR, 7Z, TAR, GZ formats', category: 'Text Tools', iconName: 'Package' },
  { slug: 'pdf-to-word', name: 'PDF to Word Converter', description: 'Convert PDF files to editable Word documents', category: 'Text Tools', iconName: 'FileText' },
  { slug: 'email-extractor', name: 'Email Extractor', description: 'Extract email addresses from text or files', category: 'Text Tools', iconName: 'Mail' },
  { slug: 'phone-number-extractor', name: 'Phone Number Extractor', description: 'Extract phone numbers from text or files', category: 'Text Tools', iconName: 'Phone' },
  { slug: 'digital-signature', name: 'Digital Signature Generator', description: 'Create and customize digital signatures', category: 'Text Tools', iconName: 'PenSquare' },
  { slug: 'pdf-tools', name: 'PDF Tools', description: 'Work with PDF files', category: 'Text Tools', iconName: 'FileCog' },
  { slug: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON data', category: 'Text Tools', iconName: 'FileJson' },
  { slug: 'html-formatter', name: 'HTML Formatter', description: 'Format and beautify HTML code', category: 'Text Tools', iconName: 'Code' },
  { slug: 'text-paragraph-splitter', name: 'Text Paragraph Splitter', description: 'Split text into paragraphs by word count, sentences, or chunks', category: 'Text Tools', iconName: 'FileText' },
  { slug: 'blog-generator', name: 'Blog Generator', description: 'Generate creative blog topics, outlines, and structured content', category: 'Text Tools', iconName: 'PenSquare' }
];

// Translations dictionary for titles, descriptions, categories and page copy
export interface LocalizedCatalogEntry {
  name: string;
  description: string;
}

export const CATALOG_I18N: Record<string, Record<string, LocalizedCatalogEntry>> = {
  es: {
    'image-converter': { name: 'Convertidor de Imágenes', description: 'Convierte entre formatos JPG, PNG, WebP, PDF, HEIC y SVG al instante.' },
    'jpg-to-png': { name: 'Convertidor de JPG a PNG', description: 'Convierte imágenes JPG a formato PNG conservando la transparencia y máxima nitidez.' },
    'png-to-jpg': { name: 'Convertidor de PNG a JPG', description: 'Convierte imágenes PNG a JPG con compresión inteligente y menor tamaño.' },
    'webp-to-jpg': { name: 'Convertidor de WebP a JPG', description: 'Convierte archivos WebP a formato estándar JPG para máxima compatibilidad.' },
    'heic-to-jpg': { name: 'Convertidor de HEIC a JPG', description: 'Pasa fotos HEIC de iPhone a formato JPG en tu navegador sin subir nada.' },
    'svg-converter': { name: 'Convertidor SVG', description: 'Convierte archivos vectoriales SVG a PNG/JPG o viceversa fácilmente.' },
    'image-to-pdf': { name: 'Convertidor de Imagen a PDF', description: 'Combina y convierte tus imágenes en un documento PDF de alta calidad.' },
    'pdf-to-jpg': { name: 'Convertidor de PDF a JPG', description: 'Extrae páginas de documentos PDF como imágenes JPG nítidas y listas.' },
    'pdf-to-png': { name: 'Convertidor de PDF a PNG', description: 'Convierte páginas de PDF a imágenes PNG de alta resolución.' },
    'image-resizer': { name: 'Redimensionador de Imágenes', description: 'Cambia las dimensiones de fotos a píxeles exactos manteniendo la proporción.' },
    'image-cropper': { name: 'Recortador de Imágenes', description: 'Recorta fotos con precisión milimétrica y relaciones de aspecto personalizadas.' },
    'image-compressor': { name: 'Compresor de Imágenes', description: 'Reduce el tamaño de imágenes JPG, PNG y WebP sin perder calidad visual.' },
    'webp-compressor': { name: 'Compresor de WebP', description: 'Optimiza y reduce el peso de tus archivos WebP al máximo rendimiento.' },
    'png-compressor': { name: 'Compresor de PNG', description: 'Comprime imágenes PNG manteniendo la transparencia intacta.' },
    'jpeg-compressor': { name: 'Compresor de JPEG', description: 'Optimiza archivos JPEG/JPG con niveles de compresión avanzados.' },
    'gif-compressor': { name: 'Compresor de GIF', description: 'Comprime animaciones GIF reduciendo el tamaño sin arruinar la fluidez.' },
    'color-picker': { name: 'Selector de Color y Paletas', description: 'Selecciona colores, genera degradados y convierte entre HEX, RGB y HSL.' },
    'base64-image': { name: 'Convertidor de Imagen a Base64', description: 'Convierte imágenes a cadenas Data URI Base64 e incrusta código en HTML/CSS.' },
    'video-compressor': { name: 'Compresor de Video', description: 'Comprime videos MP4 y WebM manteniendo excelente calidad en tu navegador.' },
    'emoji-generator': { name: 'Generador de Emojis', description: 'Encuentra y genera emojis ideales según tu estado de ánimo o descripción.' },
    'gradient-generator': { name: 'Generador de Degradados CSS', description: 'Crea degradados CSS modernos lineales y radiales con más de 150 estilos.' },
    'video-to-audio': { name: 'Convertidor de Video a Audio', description: 'Extrae pistas de audio MP3 desde archivos de video de forma rápida.' },
    'image-to-text': { name: 'Extractor de Texto OCR', description: 'Extrae texto legible de capturas e imágenes en múltiples idiomas.' },
    'qr-generator': { name: 'Generador de Códigos QR', description: 'Crea códigos QR personalizados para enlaces, WiFi, textos y contactos.' },
    'base64-converter': { name: 'Convertidor Base64', description: 'Codifica y decodifica cadenas de texto y archivos a formato Base64.' },
    'css-minifier': { name: 'Minificador de CSS', description: 'Comprime y minifica código CSS eliminando espacios innecesarios.' },
    'url-encoder-decoder': { name: 'Codificador/Decodificador de URL', description: 'Codifica y decodifica parámetros de enlaces URL para navegación segura.' },
    'password-generator': { name: 'Generador de Contraseñas', description: 'Genera contraseñas aleatorias ultra seguras y resistentes a ataques.' },
    'text-diff': { name: 'Comparador de Texto (Diff)', description: 'Compara dos textos línea por línea y resalta las diferencias al instante.' },
    'phone-generator': { name: 'Generador de Números Telefónicos', description: 'Genera números de teléfono de prueba con formatos internacionales.' },
    'lorem-generator': { name: 'Generador de Lorem Ipsum', description: 'Genera párrafos de texto ficticio profesional para maquetación.' },
    'comma-separator': { name: 'Separador por Comas', description: 'Transforma listas y textos con comas, saltos de línea y delimitadores.' },
    'random-name-generator': { name: 'Generador de Nombres Aleatorios', description: 'Genera nombres ficticios únicos basados en diversas culturas.' },
    'markdown-to-html': { name: 'Convertidor de Markdown a HTML', description: 'Convierte texto en formato Markdown a código HTML limpio y estructurado.' },
    'word-counter': { name: 'Contador de Palabras y Letras', description: 'Cuenta palabras, caracteres, oraciones, párrafos y tiempo de lectura.' },
    'credit-card-generator': { name: 'Generador de Tarjetas de Prueba', description: 'Genera números de prueba con validación de algoritmo de Luhn.' },
    'js-minifier': { name: 'Minificador de JavaScript', description: 'Minifica y optimiza código JS reduciendo el tiempo de carga web.' },
    'word-to-pdf': { name: 'Convertidor de Word a PDF', description: 'Convierte documentos Word DOC/DOCX a formato PDF sin desconfigurar.' },
    'unit-converter': { name: 'Convertidor de Unidades', description: 'Convierte medidas de longitud, peso, temperatura, datos y velocidad.' },
    'name-wheel': { name: 'Ruleta de Nombres Aleatorios', description: 'Sortea ganadores y selecciona opciones al azar con una ruleta animada.' },
    'archive-converter': { name: 'Convertidor de Archivos (ZIP, RAR)', description: 'Convierte y descomprime archivos entre formatos ZIP, RAR, TAR, 7Z y GZ.' },
    'pdf-to-word': { name: 'Convertidor de PDF a Word', description: 'Convierte documentos PDF a archivos editables de Microsoft Word.' },
    'email-extractor': { name: 'Extractor de Emails', description: 'Extrae direcciones de correo electrónico automáticamente desde cualquier texto.' },
    'phone-number-extractor': { name: 'Extractor de Números de Teléfono', description: 'Detecta y extrae listas de teléfonos desde bloques de texto o documentos.' },
    'digital-signature': { name: 'Creador de Firma Digital', description: 'Dibuja tu firma digital en pantalla y descárgala en formato PNG transparente.' },
    'pdf-tools': { name: 'Suite de Herramientas PDF', description: 'Unifica, convierte, organiza y optimiza tus documentos PDF en un solo lugar.' },
    'json-formatter': { name: 'Formateador y Validador JSON', description: 'Embellece, formatea, sangra y valida sintaxis de archivos JSON.' },
    'html-formatter': { name: 'Formateador de HTML', description: 'Formatea y organiza código HTML desordenado con la indentación correcta.' },
    'text-paragraph-splitter': { name: 'Divisor de Párrafos de Texto', description: 'Divide textos extensos en bloques según número de palabras o frases.' },
    'blog-generator': { name: 'Generador de Artículos de Blog', description: 'Crea títulos cautivadores, esquemas y estructuras para tus posts.' }
  },
  fr: {
    'image-converter': { name: "Convertisseur d'Images", description: "Convertissez entre les formats JPG, PNG, WebP, PDF, HEIC et SVG en ligne." },
    'jpg-to-png': { name: 'Convertisseur JPG en PNG', description: 'Convertissez des images JPG en PNG avec transparence et haute définition.' },
    'png-to-jpg': { name: 'Convertisseur PNG en JPG', description: 'Convertissez des images PNG en JPG avec compression optimale.' },
    'webp-to-jpg': { name: 'Convertisseur WebP en JPG', description: 'Convertissez des images WebP en JPG pour une compatibilité maximale.' },
    'heic-to-jpg': { name: 'Convertisseur HEIC en JPG', description: 'Convertissez vos photos iPhone HEIC en JPG directement dans le navigateur.' },
    'svg-converter': { name: 'Convertisseur SVG', description: 'Convertissez des fichiers SVG vectoriels en PNG/JPG ou inversement.' },
    'image-to-pdf': { name: 'Convertisseur Image en PDF', description: 'Assemblez et transformez vos photos en un fichier PDF de qualité supérieure.' },
    'pdf-to-jpg': { name: 'Convertisseur PDF en JPG', description: 'Convertissez chaque page de vos fichiers PDF en images JPG de haute qualité.' },
    'pdf-to-png': { name: 'Convertisseur PDF en PNG', description: 'Exportez les pages PDF en images PNG haute résolution sans perte.' },
    'image-resizer': { name: "Redimensionneur d'Images", description: 'Modifiez les dimensions de vos images aux pixels précis tout en gardant le ratio.' },
    'image-cropper': { name: "Recadreur d'Images", description: 'Recadrez des photos avec précision et rapports de forme personnalisés.' },
    'image-compressor': { name: "Compresseur d'Images", description: 'Réduisez la taille de vos images sans perte visible de qualité.' },
    'webp-compressor': { name: 'Compresseur WebP', description: 'Optimisez et réduisez efficacement le poids de vos fichiers WebP.' },
    'png-compressor': { name: 'Compresseur PNG', description: 'Compressez vos fichiers PNG en conservant parfaitement la transparence.' },
    'jpeg-compressor': { name: 'Compresseur JPEG', description: 'Compressez vos photos JPEG/JPG avec des réglages avancés.' },
    'gif-compressor': { name: 'Compresseur GIF', description: 'Réduisez la taille de vos animations GIF en gardant une excellente fluidité.' },
    'color-picker': { name: 'Pipette & Sélecteur de Couleurs', description: 'Choisissez des couleurs, créez des palettes et convertissez HEX, RVB et HSL.' },
    'base64-image': { name: 'Convertisseur Image en Base64', description: 'Convertissez vos images en chaînes Base64 Data URI pour le web.' },
    'video-compressor': { name: 'Compresseur Vidéo', description: 'Compressez vos fichiers vidéo sans perte de qualité dans votre navigateur.' },
    'emoji-generator': { name: "Générateur d'Émojis", description: "Trouvez les émojis parfaits selon vos idées ou vos émotions du moment." },
    'gradient-generator': { name: 'Générateur de Dégradés CSS', description: 'Créez de superbes dégradés CSS linéaires et radiaux avec plus de 150 modèles.' },
    'video-to-audio': { name: 'Convertisseur Vidéo en Audio', description: 'Extrayez la piste audio MP3 de vos vidéos en quelques secondes.' },
    'image-to-text': { name: "Extraction de Texte d'Image (OCR)", description: 'Extrayez le texte de vos images et captures en plusieurs langues.' },
    'qr-generator': { name: 'Générateur de QR Code', description: 'Créez des codes QR personnalisés pour sites web, réseaux Wi-Fi et textes.' },
    'base64-converter': { name: 'Convertisseur Base64', description: 'Encodez et décodez du texte et des fichiers en Base64 facilement.' },
    'css-minifier': { name: 'Minifieur CSS', description: 'Minifiez votre code CSS pour réduire la taille des fichiers web.' },
    'url-encoder-decoder': { name: "Encodeur/Décodeur d'URL", description: 'Encodez et décodez vos adresses URL pour une transmission sécurisée.' },
    'password-generator': { name: 'Générateur de Mots de Passe', description: 'Générez des mots de passe aléatoires hautement sécurisés et uniques.' },
    'text-diff': { name: 'Comparateur de Texte', description: 'Comparez deux textes et repérez immédiatement les ajouts et modifications.' },
    'phone-generator': { name: 'Générateur de Numéros de Téléphone', description: 'Générez des numéros factices de test pour différents pays.' },
    'lorem-generator': { name: 'Générateur de Lorem Ipsum', description: 'Créez du faux texte professionnel pour vos maquettes de design.' },
    'comma-separator': { name: 'Séparateur par Virgule', description: 'Formatez et convertissez des listes avec divers délimiteurs.' },
    'random-name-generator': { name: 'Générateur de Noms Aléatoires', description: 'Générez des noms originaux issus de nombreuses cultures du monde.' },
    'markdown-to-html': { name: 'Convertisseur Markdown en HTML', description: 'Transformez vos documents Markdown en code HTML propre et valide.' },
    'word-counter': { name: 'Compteur de Mots et Caractères', description: 'Comptez les mots, caractères, phrases et temps de lecture en temps réel.' },
    'credit-card-generator': { name: 'Générateur de Cartes de Test', description: 'Générez des numéros de test fictifs conformes à l’algorithme de Luhn.' },
    'js-minifier': { name: 'Minifieur JavaScript', description: 'Minifiez et compressez votre code JS pour accélérer votre site web.' },
    'word-to-pdf': { name: 'Convertisseur Word en PDF', description: 'Convertissez vos documents Word DOCX en PDF de manière fidèle.' },
    'unit-converter': { name: "Convertisseur d'Unités", description: 'Convertissez des unités de longueur, poids, température et stockage.' },
    'name-wheel': { name: 'Roue Aléatoire des Noms', description: 'Tirez au sort un nom ou une décision avec une roue interactive animée.' },
    'archive-converter': { name: "Convertisseur d'Archives", description: 'Convertissez vos archives entre formats ZIP, RAR, 7Z, TAR et GZ.' },
    'pdf-to-word': { name: 'Convertisseur PDF en Word', description: 'Convertissez des documents PDF en fichiers Word éditables rapidement.' },
    'email-extractor': { name: "Extracteur d'Emails", description: 'Extrayez automatiquement les adresses email à partir de vos textes.' },
    'phone-number-extractor': { name: 'Extracteur de Numéros de Téléphone', description: 'Extrayez des listes de téléphones depuis n’importe quel document.' },
    'digital-signature': { name: 'Créateur de Signature Numérique', description: 'Dessinez votre signature électronique et téléchargez-la en PNG transparent.' },
    'pdf-tools': { name: 'Outils PDF Tout-en-Un', description: 'Gérez, fusionnez, divisez et optimisez vos fichiers PDF en toute simplicité.' },
    'json-formatter': { name: 'Formateur & Validateur JSON', description: 'Formatez, indentez et validez facilement la syntaxe de vos données JSON.' },
    'html-formatter': { name: 'Formateur de Code HTML', description: 'Embellissez et organisez votre code HTML avec une indentation propre.' },
    'text-paragraph-splitter': { name: 'Diviseur de Paragraphes', description: 'Découpez vos longs textes en paragraphes structurés selon le nombre de mots.' },
    'blog-generator': { name: "Générateur d'Articles de Blog", description: 'Générez des idées d’articles captivantes et des plans détaillés.' }
  },
  de: {
    'image-converter': { name: 'Bild-Konverter', description: 'Konvertieren Sie Bilder zwischen JPG, PNG, WebP, PDF, HEIC und SVG.' },
    'jpg-to-png': { name: 'JPG in PNG Umwandeln', description: 'JPG-Bilder in PNG-Format mit Transparenz umwandeln.' },
    'png-to-jpg': { name: 'PNG in JPG Umwandeln', description: 'PNG-Bilder in platzsparendes JPG-Format konvertieren.' },
    'webp-to-jpg': { name: 'WebP in JPG Umwandeln', description: 'WebP-Bilder für beste Kompatibilität in JPG umwandeln.' },
    'heic-to-jpg': { name: 'HEIC in JPG Umwandeln', description: 'iPhone HEIC-Fotos direkt im Browser in JPG konvertieren.' },
    'svg-converter': { name: 'SVG Konverter', description: 'Vektorielle SVG-Dateien in PNG/JPG oder umgekehrt umwandeln.' },
    'image-to-pdf': { name: 'Bild in PDF Umwandeln', description: 'Bilder einfach in ein hochwertiges PDF-Dokument zusammenführen.' },
    'pdf-to-jpg': { name: 'PDF in JPG Umwandeln', description: 'PDF-Seiten in scharfe JPG-Bilder konvertieren.' },
    'pdf-to-png': { name: 'PDF in PNG Umwandeln', description: 'PDF-Seiten in hochauflösende PNG-Bilder umwandeln.' },
    'image-resizer': { name: 'Bildgröße Ändern', description: 'Bilder auf exakte Maße anpassen unter Erhaltung des Seitenverhältnisses.' },
    'image-cropper': { name: 'Bilder Zuschneiden', description: 'Fotos mit präzisen Seitenverhältnissen zuschneiden.' },
    'image-compressor': { name: 'Bilder Komprimieren', description: 'Bilder optimieren und Dateigröße ohne sichtbaren Qualitätsverlust verringern.' },
    'webp-compressor': { name: 'WebP Komprimieren', description: 'WebP-Bilder effizient verkleinern bei bester Bildschärfe.' },
    'png-compressor': { name: 'PNG Komprimieren', description: 'PNG-Dateien komprimieren bei voller Transparenz.' },
    'jpeg-compressor': { name: 'JPEG Komprimieren', description: 'JPEG/JPG-Dateien mit modernster Komprimierung optimieren.' },
    'gif-compressor': { name: 'GIF Komprimieren', description: 'GIF-Animationen effektiv verkleinern bei flüssiger Darstellung.' },
    'color-picker': { name: 'Farbwähler & Farbpaletten', description: 'Farben auswählen, Paletten erstellen und HEX, RGB und HSL umrechnen.' },
    'base64-image': { name: 'Bild in Base64 Umwandeln', description: 'Bilder in Base64-Strings und Data URIs für CSS/HTML konvertieren.' },
    'video-compressor': { name: 'Video Komprimieren', description: 'Videodateien direkt im Browser ohne Datenverlust verkleinern.' },
    'emoji-generator': { name: 'Emoji Generator', description: 'Finden und generieren Sie passende Emojis nach Stimmung oder Begriff.' },
    'gradient-generator': { name: 'CSS Farbverlauf Generator', description: 'Erstellen Sie moderne lineare und radiale CSS-Farbverläufe.' },
    'video-to-audio': { name: 'Video in Audio Umwandeln', description: 'Audiospuren als MP3 schnell aus Videodateien extrahieren.' },
    'image-to-text': { name: 'Bild zu Text (OCR)', description: 'Text aus Screenshots und Bildern in mehreren Sprachen extrahieren.' },
    'qr-generator': { name: 'QR-Code Erstellen', description: 'Kostenlose QR-Codes für Links, WLAN und Kontaktdaten generieren.' },
    'base64-converter': { name: 'Base64 Konverter', description: 'Texte und Dateien online in Base64 kodieren und dekodieren.' },
    'css-minifier': { name: 'CSS Minifier', description: 'CSS-Code bereinigen und minifizieren für schnellere Webseiten.' },
    'url-encoder-decoder': { name: 'URL Kodierer & Dekodierer', description: 'URLs und Web-Parameter für sichere Übertragung encodieren.' },
    'password-generator': { name: 'Passwort Generator', description: 'Zufällige und extrem sichere Passwörter mit einem Klick erzeugen.' },
    'text-diff': { name: 'Text-Vergleich (Diff)', description: 'Zwei Texte Zeile für Zeile vergleichen und Unterschiede hervorheben.' },
    'phone-generator': { name: 'Telefonnummer Generator', description: 'Zufällige Testnummern für weltweite Länderformate generieren.' },
    'lorem-generator': { name: 'Lorem Ipsum Generator', description: 'Professionellen Blindtext für Designs und Layouts erstellen.' },
    'comma-separator': { name: 'Komma-Trenner', description: 'Texte und Listen mit benutzerdefinierten Trennzeichen formatieren.' },
    'random-name-generator': { name: 'Zufallsnamen Generator', description: 'Namen aus verschiedenen Kulturen und Regionen zufällig erzeugen.' },
    'markdown-to-html': { name: 'Markdown in HTML Umwandeln', description: 'Markdown-Formatierungen in sauberen HTML-Code transformieren.' },
    'word-counter': { name: 'Wortzähler & Zeichenzähler', description: 'Wörter, Zeichen, Sätze und geschätzte Lesezeit live ermitteln.' },
    'credit-card-generator': { name: 'Test-Kreditkarten Generator', description: 'Prüfziffer-geprüfte Testkreditkarten für Entwicklung generieren.' },
    'js-minifier': { name: 'JavaScript Minifier', description: 'JavaScript-Code komprimieren für minimale Ladezeiten.' },
    'word-to-pdf': { name: 'Word in PDF Umwandeln', description: 'Word-Dokumente DOCX in PDF konvertieren ohne Formatverlust.' },
    'unit-converter': { name: 'Einheitenumrechner', description: 'Maßeinheiten für Länge, Gewicht, Temperatur und Daten umrechnen.' },
    'name-wheel': { name: 'Glücksrad & Zufallsauswahl', description: 'Namen oder Entscheidungen mit einem animierten Glücksrad auslosen.' },
    'archive-converter': { name: 'Archiv-Konverter (ZIP, RAR)', description: 'Archive zwischen ZIP, RAR, 7Z, TAR und GZ unkompliziert umwandeln.' },
    'pdf-to-word': { name: 'PDF in Word Umwandeln', description: 'PDF-Dateien in bearbeitbare Word-Dokumente konvertieren.' },
    'email-extractor': { name: 'E-Mail Adressen Extrahieren', description: 'Alle E-Mail-Adressen automatisch aus Fließtext filtern.' },
    'phone-number-extractor': { name: 'Telefonnummern Extrahieren', description: 'Telefonnummern zuverlässig aus Texten und Dokumenten auslesen.' },
    'digital-signature': { name: 'Digitale Signatur Erstellen', description: 'Online-Unterschrift zeichnen und als transparente PNG-Datei speichern.' },
    'pdf-tools': { name: 'PDF Werkzeuge Komplettsuite', description: 'PDF-Dateien zusammenfügen, umwandeln und optimal verwalten.' },
    'json-formatter': { name: 'JSON Formatierer & Validierer', description: 'JSON-Dateien sauber einrücken, formatieren und Syntax prüfen.' },
    'html-formatter': { name: 'HTML Formatierer', description: 'Unordentlichen HTML-Code mit korrekter Einrückung strukturieren.' },
    'text-paragraph-splitter': { name: 'Text-Absatz-Teiler', description: 'Große Texte nach Wortzahl oder Abschnitten übersichtlich aufteilen.' },
    'blog-generator': { name: 'Blog-Artikel Generator', description: 'Spannende Überschriften und Inhaltsgliederungen für Blogs erstellen.' }
  }
};

export function getLocalizedToolItem(slug: string, locale: string): { name: string; description: string } {
  const code = locale.toLowerCase();
  if (CATALOG_I18N[code]?.[slug]) {
    return CATALOG_I18N[code][slug];
  }
  const tool = TOOLS_CATALOG.find(t => t.slug === slug);
  return {
    name: tool?.name || slug,
    description: tool?.description || ''
  };
}

export function getCategoryTitle(category: string, locale: string): string {
  const code = locale.toLowerCase();
  if (code === 'es') {
    if (category === 'Image Tools') return 'Herramientas de Imagen';
    if (category === 'Text Tools') return 'Herramientas de Texto';
    return 'Otras Herramientas';
  }
  if (code === 'fr') {
    if (category === 'Image Tools') return "Outils d'Image";
    if (category === 'Text Tools') return 'Outils de Texte';
    return 'Autres Outils';
  }
  if (code === 'de') {
    if (category === 'Image Tools') return 'Bild-Tools';
    if (category === 'Text Tools') return 'Text-Tools';
    return 'Weitere Tools';
  }
  if (code === 'pt') {
    if (category === 'Image Tools') return 'Ferramentas de Imagem';
    if (category === 'Text Tools') return 'Ferramentas de Texto';
    return 'Outras Ferramentas';
  }
  if (code === 'it') {
    if (category === 'Image Tools') return 'Strumenti per Immagini';
    if (category === 'Text Tools') return 'Strumenti di Testo';
    return 'Altri Strumenti';
  }
  if (code === 'ru') {
    if (category === 'Image Tools') return 'Инструменты для изображений';
    if (category === 'Text Tools') return 'Инструменты для текста';
    return 'Другие инструменты';
  }
  if (code === 'ja') {
    if (category === 'Image Tools') return '画像ツール';
    if (category === 'Text Tools') return 'テキストツール';
    return 'その他のツール';
  }
  if (code === 'zh-cn' || code === 'zh') {
    if (category === 'Image Tools') return '图片处理工具';
    if (category === 'Text Tools') return '文本处理工具';
    return '其他工具';
  }
  if (code === 'ar') {
    if (category === 'Image Tools') return 'أدوات الصور';
    if (category === 'Text Tools') return 'أدوات النصوص';
    return 'أدوات أخرى';
  }
  if (code === 'hi') {
    if (category === 'Image Tools') return 'इमेज टूल्स';
    if (category === 'Text Tools') return 'टेक्स्ट टूल्स';
    return 'अन्य टूल्स';
  }
  if (code === 'tr') {
    if (category === 'Image Tools') return 'Görsel Araçları';
    if (category === 'Text Tools') return 'Metin Araçları';
    return 'Diğer Araçlar';
  }
  if (code === 'id') {
    if (category === 'Image Tools') return 'Alat Gambar';
    if (category === 'Text Tools') return 'Alat Teks';
    return 'Alat Lainnya';
  }
  return category;
}

export function getToolsPageHeaderAndInfo(locale: string) {
  const code = locale.toLowerCase();
  if (code === 'es') {
    return {
      h1: 'Herramientas Gratuitas en Línea',
      subtitle: 'Una colección de 50 herramientas gratuitas para ayudarte con tus tareas diarias',
      searchPlaceholder: 'Buscar herramientas...',
      aboutTitle: 'Acerca de Nuestras Herramientas',
      aboutDesc: 'Todas las herramientas son gratuitas y se ejecutan 100% en tu navegador. No se envía ningún dato a nuestros servidores, garantizando tu total privacidad y seguridad.',
      secureTitle: 'Seguro',
      secureDesc: 'Todo el procesamiento se realiza en tu navegador',
      fastTitle: 'Rápido',
      fastDesc: 'Resultados instantáneos sin demoras de servidor',
      freeTitle: 'Gratuito',
      freeDesc: 'Todas las herramientas son completamente gratuitas'
    };
  }
  if (code === 'fr') {
    return {
      h1: 'Outils Gratuits en Ligne',
      subtitle: 'Une collection de 50 outils gratuits pour vous aider dans vos tâches quotidiennes',
      searchPlaceholder: 'Rechercher des outils...',
      aboutTitle: 'À Propos de Nos Outils',
      aboutDesc: 'Tous les outils sont gratuits et fonctionnent entièrement dans votre navigateur. Aucune donnée n’est envoyée à nos serveurs pour une sécurité optimale.',
      secureTitle: 'Sécurisé',
      secureDesc: 'Tous les traitements s’exécutent dans votre navigateur',
      fastTitle: 'Rapide',
      fastDesc: 'Des résultats instantanés sans délai de serveur',
      freeTitle: 'Gratuit',
      freeDesc: 'Tous les outils sont 100% gratuits'
    };
  }
  if (code === 'de') {
    return {
      h1: 'Kostenlose Online-Tools',
      subtitle: 'Eine Sammlung von 50 kostenlosen Tools für Ihre täglichen Aufgaben',
      searchPlaceholder: 'Tools durchsuchen...',
      aboutTitle: 'Über Unsere Online-Tools',
      aboutDesc: 'Alle Tools sind völlig kostenlos und laufen zu 100% in Ihrem Browser. Es werden keine Daten an Server übertragen – höchste Privatsphäre garantiert.',
      secureTitle: 'Sicher',
      secureDesc: 'Verarbeitung erfolgt lokal in Ihrem Browser',
      fastTitle: 'Schnell',
      fastDesc: 'Sofortige Ergebnisse ohne Server-Wartezeit',
      freeTitle: 'Kostenlos',
      freeDesc: 'Alle Tools stehen dauerhaft gratis zur Verfügung'
    };
  }
  if (code === 'pt') {
    return {
      h1: 'Ferramentas Gratuitas Online',
      subtitle: 'Uma coleção de 50 ferramentas gratuitas para ajudar nas suas tarefas diárias',
      searchPlaceholder: 'Pesquisar ferramentas...',
      aboutTitle: 'Sobre Nossas Ferramentas',
      aboutDesc: 'Todas as ferramentas são gratuitas e rodam 100% no seu navegador. Nenhum dado é enviado para servidores externos, garantindo privacidade absoluta.',
      secureTitle: 'Seguro',
      secureDesc: 'Todo o processamento acontece no seu navegador',
      fastTitle: 'Rápido',
      fastDesc: 'Resultados instantâneos sem filas de servidor',
      freeTitle: 'Gratuito',
      freeDesc: 'Todas as ferramentas são totalmente gratuitas'
    };
  }
  if (code === 'it') {
    return {
      h1: 'Strumenti Gratuiti Online',
      subtitle: 'Una raccolta di 50 strumenti gratuiti per aiutarti nelle tue attività quotidiane',
      searchPlaceholder: 'Cerca strumenti...',
      aboutTitle: 'Informazioni sui Nostri Strumenti',
      aboutDesc: 'Tutti gli strumenti sono gratuiti e funzionano direttamente nel tuo browser. Nessun file viene inviato ai server esterni.',
      secureTitle: 'Sicuro',
      secureDesc: 'Elaborazione al 100% nel tuo browser locale',
      fastTitle: 'Veloce',
      fastDesc: 'Risultati istantanei senza attese di caricamento',
      freeTitle: 'Gratuito',
      freeDesc: 'Tutti gli strumenti sono completamente gratuiti'
    };
  }
  if (code === 'ru') {
    return {
      h1: 'Бесплатные Онлайн Инструменты',
      subtitle: 'Коллекция из 50 бесплатных инструментов для решения ваших повседневных задач',
      searchPlaceholder: 'Поиск инструментов...',
      aboutTitle: 'О Наших Инструментах',
      aboutDesc: 'Все инструменты бесплатны и работают на 100% в вашем браузере. Файлы не отправляются на сервер, обеспечивая полную конфиденциальность.',
      secureTitle: 'Безопасно',
      secureDesc: 'Вся обработка происходит прямо в вашем браузере',
      fastTitle: 'Быстро',
      fastDesc: 'Мгновенные результаты без задержек сервера',
      freeTitle: 'Бесплатно',
      freeDesc: 'Все инструменты абсолютно бесплатны'
    };
  }
  if (code === 'ja') {
    return {
      h1: '無料オンラインツール',
      subtitle: '日常の作業をサポートする50種類の無料ツールコレクション',
      searchPlaceholder: 'ツールを検索...',
      aboutTitle: 'ツールについて',
      aboutDesc: 'すべてのツールは完全無料で、ブラウザ内でのみ動作します。データが外部サーバーに送信されることはなく、安全にご利用いただけます。',
      secureTitle: '安全・安心',
      secureDesc: 'すべての処理がブラウザ内で安全に完了します',
      fastTitle: '超高速',
      fastDesc: 'サーバー待機時間なしで瞬時に結果を表示します',
      freeTitle: '完全無料',
      freeDesc: 'すべての機能をいつでも無料でご利用いただけます'
    };
  }
  if (code === 'zh-cn' || code === 'zh') {
    return {
      h1: '免费在线工具大全',
      subtitle: '精选50款免费高效工具，助您轻松搞定日常工作与开发任务',
      searchPlaceholder: '搜索工具...',
      aboutTitle: '关于我们的在线工具',
      aboutDesc: '所有工具完全免费，并在您的本地浏览器中100%运行。无需向服务器上传任何文件，全力保障您的隐私与数据安全。',
      secureTitle: '安全保密',
      secureDesc: '所有数据与计算均在您的本地浏览器内完成',
      fastTitle: '极速响应',
      fastDesc: '无需等待网络上传，即刻呈现处理结果',
      freeTitle: '完全免费',
      freeDesc: '所有功能开放使用，无需注册亦无任何隐藏费用'
    };
  }
  if (code === 'ar') {
    return {
      h1: 'أدوات مجانية أونلاين',
      subtitle: 'مجموعة تضم 50 أداة مجانية لمساعدتك في إنجاز مهامك اليومية بسهولة',
      searchPlaceholder: 'ابحث عن أداة...',
      aboutTitle: 'حول أدواتنا',
      aboutDesc: 'جميع الأدوات مجانية تماماً وتعمل بالكامل داخل متصفحك. لا يتم إرسال أي ملفات أو بيانات إلى خوادمنا، مما يضمن خصوصيتك التامة.',
      secureTitle: 'آمن',
      secureDesc: 'تتم جميع المعالجات محلياً داخل متصفحك',
      fastTitle: 'سريع',
      fastDesc: 'نتائج فورية دون أي تأخير في الخوادم',
      freeTitle: 'مجاني',
      freeDesc: 'جميع الأدوات متاحة للاستخدام مجاناً بنسبة 100%'
    };
  }
  if (code === 'hi') {
    return {
      h1: 'मुफ़्त ऑनलाइन टूल्स',
      subtitle: 'आपके दैनिक कार्यों में सहायता के लिए 50 मुफ़्त टूल्स का संग्रह',
      searchPlaceholder: 'टूल्स खोजें...',
      aboutTitle: 'हमारे टूल्स के बारे में',
      aboutDesc: 'सभी टूल्स उपयोग के लिए पूरी तरह मुफ़्त हैं और आपके ब्राउज़र में काम करते हैं। कोई डेटा सर्वर पर नहीं भेजा जाता, आपकी गोपनीयता सुरक्षित रहती है।',
      secureTitle: 'सुरक्षित',
      secureDesc: 'सभी प्रोसेसिंग आपके डिवाइस ब्राउज़र में होती है',
      fastTitle: 'तेज़',
      fastDesc: 'बिना सर्वर इंतज़ार के तुरंत परिणाम',
      freeTitle: 'मुफ़्त',
      freeDesc: 'सभी टूल्स उपयोग करने के लिए 100% मुफ़्त हैं'
    };
  }
  // Default English
  return {
    h1: 'Free Online Tools',
    subtitle: 'A collection of 50 free tools to help with your daily tasks',
    searchPlaceholder: 'Search tools...',
    aboutTitle: 'About Our Tools',
    aboutDesc: 'All tools are free to use and run entirely in your browser. No data is sent to our servers, ensuring your information remains private and secure.',
    secureTitle: 'Secure',
    secureDesc: 'All processing happens in your browser',
    fastTitle: 'Fast',
    fastDesc: 'Instant results with no server delays',
    freeTitle: 'Free',
    freeDesc: 'All tools are completely free to use'
  };
}

