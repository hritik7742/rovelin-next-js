import { SUPPORTED_LANGUAGES, getLanguage, Language } from './languages';
import { TOOLS_MAP, ToolDefinition, TOOLS_REGISTRY } from './tools-registry';

export interface LocalizedBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface LocalizedStep {
  step: number;
  title: string;
  description: string;
}

export interface LocalizedFaq {
  question: string;
  answer: string;
}

export interface LocalizedToolContent {
  title: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  subtitle: string;
  badge: string;
  benefitsTitle: string;
  benefits: LocalizedBenefit[];
  howToTitle: string;
  howTo: LocalizedStep[];
  featuresTitle: string;
  features: string[];
  faqTitle: string;
  faqs: LocalizedFaq[];
  relatedTitle: string;
}

export interface LocalizedToolsIndex {
  title: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  subtitle: string;
  searchPlaceholder: string;
  allCategories: string;
  categoryNames: Record<string, string>;
  totalToolsBadge: (count: number) => string;
  freeOnlineBadge: string;
  popularTitle: string;
  openToolText: string;
}

export interface LocalizedUi {
  home: string;
  tools: string;
  language: string;
  selectLanguage: string;
  searchLanguages: string;
  close: string;
  currentLanguage: string;
  switchPrompt: string;
  footerRights: string;
}

// Language Packs with specific native terminology
export const LANGUAGE_DICTIONARIES: Record<string, {
  free: string;
  online: string;
  tool: string;
  fastSecure: string;
  browserSafe: string;
  home: string;
  tools: string;
  search: string;
  allCategories: string;
  selectLanguage: string;
  benefitsTitle: string;
  howToTitle: string;
  featuresTitle: string;
  faqTitle: string;
  relatedTitle: string;
  b1Title: string;
  b1Desc: string;
  b2Title: string;
  b2Desc: string;
  b3Title: string;
  b3Desc: string;
  b4Title: string;
  b4Desc: string;
  s1Title: string;
  s1Desc: string;
  s2Title: string;
  s2Desc: string;
  s3Title: string;
  s3Desc: string;
  q1: string;
  a1: string;
  q2: string;
  a2: string;
  q3: string;
  a3: string;
  q4: string;
  a4: string;
  catNames: Record<string, string>;
}> = {
  en: {
    free: "Free",
    online: "Online",
    tool: "Tool",
    fastSecure: "Fast, Free & Secure",
    browserSafe: "Processed 100% in your browser. No files are uploaded to any server.",
    home: "Home",
    tools: "Tools",
    search: "Search tools...",
    allCategories: "All Categories",
    selectLanguage: "Select Language",
    benefitsTitle: "Why Choose Our Tool?",
    howToTitle: "How to Use in 3 Simple Steps",
    featuresTitle: "Key Features & Capabilities",
    faqTitle: "Frequently Asked Questions",
    relatedTitle: "Related Online Tools",
    b1Title: "⚡ Lightning Fast Processing",
    b1Desc: "Instantly process files directly in your browser using modern client-side technology.",
    b2Title: "🔒 100% Private & Secure",
    b2Desc: "Your files never leave your device. Everything runs locally in memory.",
    b3Title: "🎯 High Quality Output",
    b3Desc: "Advanced algorithms ensure optimal compression, crisp conversions, and error-free formatting.",
    b4Title: "💸 100% Free Forever",
    b4Desc: "No subscription, no hidden fees, no limits, and no registration required.",
    s1Title: "1. Select or Paste Data",
    s1Desc: "Upload your file, drag and drop it into the workspace, or paste your text directly.",
    s2Title: "2. Configure Settings",
    s2Desc: "Adjust quality sliders, select your target formats, or choose custom options.",
    s3Title: "3. Download or Copy",
    s3Desc: "Instantly preview the result and click download or copy to save immediately.",
    q1: "Is this tool completely free to use?",
    a1: "Yes, this tool is 100% free to use with no hidden charges, no watermark, and no registration required.",
    q2: "Are my files and personal data secure?",
    a2: "Absolutely. Processing is performed client-side inside your web browser. Your data is never uploaded to any server.",
    q3: "Do I need to install any software or extensions?",
    a3: "No installation is required. The tool runs directly in any modern web browser across Windows, Mac, iOS, and Android.",
    q4: "Are there any file size or usage limits?",
    a4: "There are no strict limits on daily usage. You can process as many items as you need without restrictions.",
    catNames: {
      "Image Tools": "Image Tools",
      "PDF Tools": "PDF Tools",
      "Text Tools": "Text Tools",
      "Developer Tools": "Developer Tools",
      "Generator Tools": "Generator Tools",
      "Media Tools": "Media Tools",
      "Utility Tools": "Utility Tools"
    }
  },
  es: {
    free: "Gratis",
    online: "en Línea",
    tool: "Herramienta",
    fastSecure: "Rápido, Gratuito y 100% Seguro",
    browserSafe: "Procesado 100% en tu navegador. Tus archivos no se suben a ningún servidor.",
    home: "Inicio",
    tools: "Herramientas",
    search: "Buscar herramientas...",
    allCategories: "Todas las categorías",
    selectLanguage: "Seleccionar Idioma",
    benefitsTitle: "¿Por Qué Elegir Nuestra Herramienta?",
    howToTitle: "Cómo Usar en 3 Sencillos Pasos",
    featuresTitle: "Características y Funcionalidades Clave",
    faqTitle: "Preguntas Frecuentes",
    relatedTitle: "Herramientas Relacionadas",
    b1Title: "⚡ Procesamiento Ultrarrápido",
    b1Desc: "Procesa tus archivos y datos de forma instantánea directamente en el navegador con tecnología de alto rendimiento.",
    b2Title: "🔒 100% Privado y Seguro",
    b2Desc: "Tus archivos nunca salen de tu ordenador o teléfono. Todo se procesa de forma local y confidencial.",
    b3Title: "🎯 Máxima Calidad Garantizada",
    b3Desc: "Algoritmos inteligentes proporcionan una compresión óptima, conversiones nítidas y resultados perfectos.",
    b4Title: "💸 Totalmente Gratis sin Límites",
    b4Desc: "Sin suscripciones, sin tarifas ocultas, sin marcas de agua y sin registro. Acceso ilimitado cuando quieras.",
    s1Title: "1. Sube o Pega tus Datos",
    s1Desc: "Arrastra y suelta tu archivo en el área de trabajo o pega tu texto directamente en el editor.",
    s2Title: "2. Personaliza los Ajustes",
    s2Desc: "Ajusta la calidad, selecciona los formatos de salida o configura las opciones según tus necesidades.",
    s3Title: "3. Descarga o Copia el Resultado",
    s3Desc: "Previsualiza el resultado en tiempo real y haz clic en descargar o copiar para guardar tu archivo al instante.",
    q1: "¿Esta herramienta es totalmente gratuita?",
    a1: "Sí, es 100% gratuita, sin límites de uso, sin marcas de agua y sin necesidad de registrarte.",
    q2: "¿Mis archivos y datos personales están seguros?",
    a2: "Completamente seguros. El procesamiento ocurre localmente en tu navegador web sin subirse a servidores.",
    q3: "¿Tengo que instalar algún programa o aplicación?",
    a3: "No necesitas instalar nada. Funciona en cualquier navegador moderno en Windows, Mac, Linux, Android e iPhone.",
    q4: "¿Existen límites de uso o tamaño de archivo?",
    a4: "No hay límites diarios. Puedes procesar tantos archivos o textos como desees.",
    catNames: {
      "Image Tools": "Herramientas de Imagen",
      "PDF Tools": "Herramientas PDF",
      "Text Tools": "Herramientas de Texto",
      "Developer Tools": "Herramientas para Desarrolladores",
      "Generator Tools": "Generadores",
      "Media Tools": "Herramientas Multimedia",
      "Utility Tools": "Utilidades Generales"
    }
  },
  fr: {
    free: "Gratuit",
    online: "en Ligne",
    tool: "Outil",
    fastSecure: "Rapide, Gratuit et Sécurisé",
    browserSafe: "Traité à 100% dans votre navigateur. Aucun fichier n'est envoyé vers un serveur.",
    home: "Accueil",
    tools: "Outils",
    search: "Rechercher un outil...",
    allCategories: "Toutes les catégories",
    selectLanguage: "Choisir la Langue",
    benefitsTitle: "Pourquoi Choisir Notre Outil ?",
    howToTitle: "Comment l'Utiliser en 3 Étapes Simples",
    featuresTitle: "Fonctionnalités Principales",
    faqTitle: "Foire Aux Questions",
    relatedTitle: "Outils Similaires",
    b1Title: "⚡ Traitement Ultra Rapide",
    b1Desc: "Traitez vos fichiers et données instantanément dans votre navigateur sans attente.",
    b2Title: "🔒 100% Privé et Confidentiel",
    b2Desc: "Vos fichiers restent sur votre appareil. Rien n'est téléchargé sur un serveur distant.",
    b3Title: "🎯 Qualité Optimale",
    b3Desc: "Des algorithmes de pointe garantissent une précision parfaite et une fidélité totale.",
    b4Title: "💸 Gratuit et Sans Limite",
    b4Desc: "Aucun abonnement, aucun filigrane et aucune inscription requise.",
    s1Title: "1. Déposez vos Fichiers",
    s1Desc: "Glissez-déposez votre fichier ou collez votre contenu directement dans l'interface.",
    s2Title: "2. Choisissez les Options",
    s2Desc: "Ajustez le niveau de compression, la qualité ou le format selon vos préférences.",
    s3Title: "3. Téléchargez le Résultat",
    s3Desc: "Vérifiez l'aperçu instantané et téléchargez votre fichier optimisé d'un simple clic.",
    q1: "Cet outil est-il réellement gratuit ?",
    a1: "Oui, il est 100% gratuit, sans inscription, sans publicité intrusive et sans filigrane.",
    q2: "Mes données personnelles sont-elles protégées ?",
    a2: "Absolument. Tout se déroule localement dans votre navigateur sans transfert vers nos serveurs.",
    q3: "Faut-il installer un logiciel sur mon ordinateur ?",
    a3: "Non, aucun logiciel ni extension n'est nécessaire. L'outil fonctionne en ligne sur tous les appareils.",
    q4: "Y a-t-il une limite de conversion ou de taille ?",
    a4: "Non, vous pouvez convertir et traiter autant de fichiers que nécessaire sans restriction.",
    catNames: {
      "Image Tools": "Outils d'Images",
      "PDF Tools": "Outils PDF",
      "Text Tools": "Outils de Texte",
      "Developer Tools": "Outils Développeur",
      "Generator Tools": "Générateurs",
      "Media Tools": "Outils Multimédia",
      "Utility Tools": "Utilitaires Pratiques"
    }
  },
  de: {
    free: "Kostenlos",
    online: "Online",
    tool: "Werkzeug",
    fastSecure: "Schnell, Kostenlos & Sicher",
    browserSafe: "Zu 100% lokal im Browser verarbeitet. Keine Dateien werden auf Server geladen.",
    home: "Startseite",
    tools: "Werkzeuge",
    search: "Werkzeuge durchsuchen...",
    allCategories: "Alle Kategorien",
    selectLanguage: "Sprache Wählen",
    benefitsTitle: "Warum Unser Tool Wählen?",
    howToTitle: "In 3 Einfachen Schritten Verwenden",
    featuresTitle: "Hauptfunktionen & Vorteile",
    faqTitle: "Häufig Gestellte Fragen",
    relatedTitle: "Verwandte Online-Tools",
    b1Title: "⚡ Blitzschnelle Verarbeitung",
    b1Desc: "Verarbeiten Sie Ihre Dateien sofort direkt im Browser ohne lange Ladezeiten.",
    b2Title: "🔒 100% Datenschutz & Sicherheit",
    b2Desc: "Ihre Dateien verlassen niemals Ihr Gerät. Die Verarbeitung erfolgt rein lokal.",
    b3Title: "🎯 Höchste Präzision & Qualität",
    b3Desc: "Moderne Algorithmen sichern verlustfreie Ergebnisse und beste Optimierung.",
    b4Title: "💸 Dauerhaft Kostenfrei",
    b4Desc: "Keine Registrierung, keine versteckten Kosten und keine Wasserzeichen.",
    s1Title: "1. Datei Auswählen",
    s1Desc: "Ziehen Sie Ihre Datei per Drag-and-Drop in den Arbeitsbereich oder fügen Sie Text ein.",
    s2Title: "2. Einstellungen Anpassen",
    s2Desc: "Wählen Sie Qualität, Zielformat oder gewünschte Parameter mit wenigen Klicks.",
    s3Title: "3. Herunterladen",
    s3Desc: "Prüfen Sie das Ergebnis in der Vorschau und laden Sie die Datei sofort herunter.",
    q1: "Ist die Nutzung komplett kostenlos?",
    a1: "Ja, alle Funktionen stehen ohne Kosten, Abonnements oder Wasserzeichen zur Verfügung.",
    q2: "Sind meine Dateien sicher?",
    a2: "Ja, zu 100%. Alles wird direkt in Ihrem Browser verarbeitet, ohne Server-Uploads.",
    q3: "Muss ein Programm installiert werden?",
    a3: "Nein, Sie können das Tool direkt im Browser auf PC, Mac oder Smartphone nutzen.",
    q4: "Gibt es ein tägliches Nutzungslimit?",
    a4: "Nein, Sie können beliebig viele Dateien ohne Begrenzung bearbeiten.",
    catNames: {
      "Image Tools": "Bildwerkzeuge",
      "PDF Tools": "PDF-Werkzeuge",
      "Text Tools": "Textwerkzeuge",
      "Developer Tools": "Entwickler-Tools",
      "Generator Tools": "Generatoren",
      "Media Tools": "Medien-Tools",
      "Utility Tools": "Dienstprogramme"
    }
  },
  pt: {
    free: "Grátis",
    online: "Online",
    tool: "Ferramenta",
    fastSecure: "Rápido, Gratuito e Seguro",
    browserSafe: "Processado 100% no seu navegador. Nenhum arquivo é enviado para servidores.",
    home: "Início",
    tools: "Ferramentas",
    search: "Pesquisar ferramentas...",
    allCategories: "Todas as categorias",
    selectLanguage: "Selecionar Idioma",
    benefitsTitle: "Por Que Escolher Nossa Ferramenta?",
    howToTitle: "Como Usar em 3 Passos Simples",
    featuresTitle: "Principais Recursos e Benefícios",
    faqTitle: "Perguntas Frequentes",
    relatedTitle: "Ferramentas Relacionadas",
    b1Title: "⚡ Processamento Instantâneo",
    b1Desc: "Processe arquivos e textos em tempo recorde direto no seu navegador com tecnologia moderna.",
    b2Title: "🔒 100% Seguro e Privado",
    b2Desc: "Seus dados permanecem estritamente no seu dispositivo, garantindo total privacidade.",
    b3Title: "🎯 Alta Qualidade e Eficiência",
    b3Desc: "Obtenha máxima qualidade com algoritmos avançados de otimização e conversão.",
    b4Title: "💸 Grátis Sem Restrições",
    b4Desc: "Sem assinaturas, sem marcas d'água e sem limites de uso. Totalmente liberado.",
    s1Title: "1. Envie ou Cole o Conteúdo",
    s1Desc: "Arraste e solte seu arquivo no campo indicado ou cole seu texto no editor.",
    s2Title: "2. Defina as Preferências",
    s2Desc: "Ajuste os parâmetros de qualidade, formatos e configurações com rapidez.",
    s3Title: "3. Baixe ou Copie",
    s3Desc: "Veja a pré-visualização instantânea e faça o download do resultado com um clique.",
    q1: "A ferramenta é realmente gratuita?",
    a1: "Sim, é 100% grátis para uso ilimitado, sem taxas e sem necessidade de cadastro.",
    q2: "Meus arquivos estão protegidos?",
    a2: "Sim. A execução ocorre no lado do cliente no navegador; nada é gravado em servidores.",
    q3: "Preciso baixar algum aplicativo?",
    a3: "Não é necessário instalar nada. Funciona no Chrome, Safari, Edge e Firefox em qualquer aparelho.",
    q4: "Há restrição de tamanho ou quantidade?",
    a4: "Você pode processar quantos itens quiser, sem limitações diárias.",
    catNames: {
      "Image Tools": "Ferramentas de Imagem",
      "PDF Tools": "Ferramentas PDF",
      "Text Tools": "Ferramentas de Texto",
      "Developer Tools": "Ferramentas para Desenvolvedores",
      "Generator Tools": "Geradores",
      "Media Tools": "Ferramentas Multimídia",
      "Utility Tools": "Utilitários Práticos"
    }
  },
  it: {
    free: "Gratuito",
    online: "Online",
    tool: "Strumento",
    fastSecure: "Veloce, Gratuito e Sicuro",
    browserSafe: "Elaborato al 100% nel tuo browser. Nessun file viene inviato a server esterni.",
    home: "Home",
    tools: "Strumenti",
    search: "Cerca strumenti...",
    allCategories: "Tutte le categorie",
    selectLanguage: "Seleziona Lingua",
    benefitsTitle: "Perché Scegliere il Nostro Strumento?",
    howToTitle: "Come Usarlo in 3 Semplici Passaggi",
    featuresTitle: "Caratteristiche Principali",
    faqTitle: "Domande Frequenti",
    relatedTitle: "Strumenti Correlati",
    b1Title: "⚡ Elaborazione Immediata",
    b1Desc: "Trasforma e ottimizza i tuoi contenuti in tempo reale senza attese né code.",
    b2Title: "🔒 Massima Sicurezza e Privacy",
    b2Desc: "I tuoi file non lasciano mai il tuo computer o smartphone. Riservatezza assoluta.",
    b3Title: "🎯 Risultati di Alta Precisione",
    b3Desc: "Algoritmi intelligenti per conversioni perfette e compressione ottimale.",
    b4Title: "💸 Gratuito per Sempre",
    b4Desc: "Nessuna registrazione, nessuna filigrana e nessun limite nascosto.",
    s1Title: "1. Carica o Incolla",
    s1Desc: "Trascina il tuo file nell'area di lavoro o incolla il testo direttamente.",
    s2Title: "2. Personalizza le Impostazioni",
    s2Desc: "Regola i parametri di qualità e seleziona il formato desiderato.",
    s3Title: "3. Salva o Scarica",
    s3Desc: "Visualizza l'anteprima e scarica immediatamente il file generato.",
    q1: "Il servizio è gratuito?",
    a1: "Sì, completamente gratuito e utilizzabile senza limiti o registrazioni.",
    q2: "I miei dati rimangono privati?",
    a2: "Sì, l'elaborazione avviene localmente nel tuo browser per la massima sicurezza.",
    q3: "Devo installare software aggiuntivo?",
    a3: "No, funziona online su qualsiasi dispositivo e browser web.",
    q4: "Ci sono limiti di utilizzo?",
    a4: "Nessun limite. Puoi convertire tutti i file che desideri in qualsiasi momento.",
    catNames: {
      "Image Tools": "Strumenti Immagini",
      "PDF Tools": "Strumenti PDF",
      "Text Tools": "Strumenti di Testo",
      "Developer Tools": "Strumenti Sviluppatore",
      "Generator Tools": "Generatori",
      "Media Tools": "Strumenti Multimediali",
      "Utility Tools": "Utility Online"
    }
  },
  ar: {
    free: "مجاني",
    online: "أونلاين",
    tool: "أداة",
    fastSecure: "سريع ومجاني وآمن 100%",
    browserSafe: "تتم المعالجة بنسبة 100% داخل متصفحك. لا يتم رفع أي ملف إلى أي خادم.",
    home: "الرئيسية",
    tools: "الأدوات",
    search: "ابحث عن أداة...",
    allCategories: "جميع الفئات",
    selectLanguage: "اختر اللغة",
    benefitsTitle: "لماذا تختار أداتنا عبر الإنترنت؟",
    howToTitle: "طريقة الاستخدام في 3 خطوات بسيطة",
    featuresTitle: "الميزات والقدرات الأساسية",
    faqTitle: "الأسئلة الشائعة",
    relatedTitle: "أدوات ذات صلة",
    b1Title: "⚡ معالجة فورية وسريعة",
    b1Desc: "معالجة فورية لملفاتك ونصوصك مباشرة عبر المتصفح باستخدام أحدث تقنيات الويب.",
    b2Title: "🔒 خصوصية وأمان تام 100%",
    b2Desc: "ملفاتك لا تغادر جهازك أبدًا. كل المعالجة تتم محليًا للحفاظ على سرية بياناتك.",
    b3Title: "🎯 جودة استثنائية ودقة فائقة",
    b3Desc: "خوارزميات متطورة تضمن أعلى درجات التحسين والدقة دون أي أخطاء.",
    b4Title: "💸 مجاني بالكامل وبدون قيود",
    b4Desc: "بدون اشتراكات وبدون علامات مائية وبدون الحاجة لإنشاء حساب أو إدخال بطاقة بنكية.",
    s1Title: "1. قم برفع أو لصق البيانات",
    s1Desc: "اسحب ملفك وأفلته في منطقة العمل أو الصق النص المطلوب في الحقل المخصص.",
    s2Title: "2. اختر الإعدادات المناسبة",
    s2Desc: "اضبط مستوى الجودة أو اختر الصيغة المستهدفة حسب رغبتك بكل سهولة.",
    s3Title: "3. تنزيل أو نسخ النتيجة",
    s3Desc: "شاهد المعاينة المباشرة واضغط على زر التحميل لحفظ ملفك فوراً.",
    q1: "هل هذه الأداة مجانية تمامًا؟",
    a1: "نعم، الأداة مجانية 100% بدون أي رسوم خفية أو علامات مائية وبلا حدود.",
    q2: "هل ملفاتي وبياناتي آمنة؟",
    a2: "نعم بالتأكيد، المعالجة تتم بالكامل داخل متصفحك محلياً ولا يتم رفع الملفات إلى أي خادم.",
    q3: "هل أحتاج إلى تثبيت أي برامج على جهازي؟",
    a3: "لا تحتاج لتثبيت أي برامج أو إضافات، تعمل الأداة مباشرة على الهاتف والكمبيوتر.",
    q4: "هل هناك حد أقصى لعدد مرات الاستخدام؟",
    a4: "لا توجد أي قيود على الاستخدام اليومي، يمكنك معالجة ما تشاء من الملفات.",
    catNames: {
      "Image Tools": "أدوات الصور",
      "PDF Tools": "أدوات PDF",
      "Text Tools": "أدوات النصوص",
      "Developer Tools": "أدوات المطورين",
      "Generator Tools": "المولدات والأدوات الذكية",
      "Media Tools": "أدوات الوسائط المتعددة",
      "Utility Tools": "أدوات ومرافق عامة"
    }
  },
  hi: {
    free: "मुफ़्त",
    online: "ऑनलाइन",
    tool: "टूल",
    fastSecure: "तेज़, मुफ़्त और 100% सुरक्षित",
    browserSafe: "आपके ब्राउज़र में 100% स्थानीय रूप से प्रोसेस होता है। कोई फ़ाइल सर्वर पर अपलोड नहीं होती।",
    home: "होम",
    tools: "टूल्स",
    search: "टूल्स खोजें...",
    allCategories: "सभी श्रेणियां",
    selectLanguage: "भाषा चुनें",
    benefitsTitle: "हमारा टूल क्यों चुनें?",
    howToTitle: "3 आसान चरणों में उपयोग करें",
    featuresTitle: "प्रमुख विशेषताएं और लाभ",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    relatedTitle: "संबंधित ऑनलाइन टूल्स",
    b1Title: "⚡ सुपरफ़ास्ट प्रोसेसिंग",
    b1Desc: "आधुनिक वेब तकनीक के साथ अपनी फ़ाइलों और डेटा को ब्राउज़र में तुरंत प्रोसेस करें।",
    b2Title: "🔒 100% निजी और सुरक्षित",
    b2Desc: "आपकी फ़ाइलें कभी भी आपके डिवाइस से बाहर नहीं जाती हैं। डेटा पूरी तरह सुरक्षित रहता है।",
    b3Title: "🎯 सर्वोत्तम गुणवत्ता",
    b3Desc: "उन्नत एल्गोरिदम हर बार बेहतरीन कंप्रेशन और सटीक परिणाम सुनिश्चित करते हैं।",
    b4Title: "💸 हमेशा के लिए मुफ़्त",
    b4Desc: "कोई सब्सक्रिप्शन नहीं, कोई वॉटरमार्क नहीं और कोई लॉगिन आवश्यक नहीं है।",
    s1Title: "1. फ़ाइल चुनें या टेक्स्ट पेस्ट करें",
    s1Desc: "अपनी फ़ाइल को ड्रैग करके छोड़ें या अपने टेक्स्ट को इनपुट बॉक्स में पेस्ट करें।",
    s2Title: "2. सेटिंग्स कस्टमाइज़ करें",
    s2Desc: "अपनी ज़रूरत के अनुसार क्वालिटी, फॉर्मेट या अन्य विकल्प चुनें।",
    s3Title: "3. डाउनलोड या कॉपी करें",
    s3Desc: "तुरंत परिणाम देखें और सेव करने के लिए डाउनलोड या कॉपी बटन पर क्लिक करें।",
    q1: "क्या यह टूल वास्तव में मुफ़्त है?",
    a1: "हाँ, यह 100% मुफ़्त है। इसके लिए किसी क्रेडिट कार्ड या रजिस्ट्रेशन की आवश्यकता नहीं है।",
    q2: "क्या मेरी फ़ाइलें और डेटा सुरक्षित हैं?",
    a2: "बिल्कुल सुरक्षित हैं। सारा काम आपके ब्राउज़र में होता है और कुछ भी सर्वर पर नहीं भेजा जाता।",
    q3: "क्या मुझे कोई सॉफ्टवेयर इंस्टॉल करना होगा?",
    a3: "नहीं, किसी भी ऐप या सॉफ्टवेयर की ज़रूरत नहीं है। यह सीधे किसी भी ब्राउज़र में चलता है।",
    q4: "क्या उपयोग की कोई दैनिक सीमा है?",
    a4: "नहीं, आप असीमित बार जितनी चाहें उतनी फ़ाइलों को प्रोसेस कर सकते हैं।",
    catNames: {
      "Image Tools": "इमेज टूल्स",
      "PDF Tools": "पीडीएफ टूल्स",
      "Text Tools": "टेक्स्ट टूल्स",
      "Developer Tools": "डेवलपर टूल्स",
      "Generator Tools": "जनरेटर टूल्स",
      "Media Tools": "मीडिया टूल्स",
      "Utility Tools": "उपयोगी टूल्स"
    }
  },
  ja: {
    free: "無料",
    online: "オンライン",
    tool: "ツール",
    fastSecure: "高速・無料・安全",
    browserSafe: "100%ブラウザ内で完結。サーバーへファイルが送信されることはありません。",
    home: "ホーム",
    tools: "ツール一覧",
    search: "ツールを検索...",
    allCategories: "すべてのカテゴリ",
    selectLanguage: "言語を選択",
    benefitsTitle: "選ばれる理由と特徴",
    howToTitle: "簡単3ステップの使い方",
    featuresTitle: "主な機能とメリット",
    faqTitle: "よくある質問 (FAQ)",
    relatedTitle: "関連オンラインツール",
    b1Title: "⚡ 圧倒的な処理スピード",
    b1Desc: "最新のクライアントサイド技術により、アップロード待ち時間ゼロで瞬時に処理します。",
    b2Title: "🔒 完全プライベート＆高セキュリティ",
    b2Desc: "ファイルはお使いの端末内でのみ処理され、外部サーバーに保存されることはありません。",
    b3Title: "🎯 最高品質の出力結果",
    b3Desc: "高度なアルゴリズムにより、画質やデータ構造を損なうことなく最適な変換を行います。",
    b4Title: "💸 制限なしで完全無料",
    b4Desc: "会員登録不要、透かしなし、隠れた費用なしでいつでも自由にご利用いただけます。",
    s1Title: "1. ファイルの選択または入力",
    s1Desc: "ファイルをドラッグ＆ドロップするか、テキストエリアに直接入力します。",
    s2Title: "2. 設定や形式の指定",
    s2Desc: "画質レベルや出力フォーマットなど、お好みのオプションを調整します。",
    s3Title: "3. プレビューとダウンロード",
    s3Desc: "リアルタイムで結果を確認し、ワンクリックでダウンロードまたはコピーします。",
    q1: "本当に無料で利用できますか？",
    a1: "はい、登録不要・透かしなしで完全無料でご利用いただけます。",
    q2: "セキュリティやプライバシーは安全ですか？",
    a2: "はい。すべての処理がブラウザ内で完結するため、外部サーバーへの流出の心配はありません。",
    q3: "ソフトウェアのインストールは必要ですか？",
    a3: "いいえ、インストール不要でPCやスマートフォンのブラウザからすぐにお使いいただけます。",
    q4: "1日の利用回数に制限はありますか？",
    a4: "回数制限はありません。必要な時に何度でも自由にお使いください。",
    catNames: {
      "Image Tools": "画像ツール",
      "PDF Tools": "PDFツール",
      "Text Tools": "テキストツール",
      "Developer Tools": "開発者ツール",
      "Generator Tools": "生成ツール",
      "Media Tools": "メディアツール",
      "Utility Tools": "便利ツール"
    }
  },
  ru: {
    free: "Бесплатно",
    online: "Онлайн",
    tool: "Инструмент",
    fastSecure: "Быстро, Бесплатно и Безопасно",
    browserSafe: "Обработка на 100% в вашем браузере. Файлы не загружаются на сервер.",
    home: "Главная",
    tools: "Инструменты",
    search: "Поиск инструментов...",
    allCategories: "Все категории",
    selectLanguage: "Выберите язык",
    benefitsTitle: "Почему стоит выбрать наш инструмент?",
    howToTitle: "Как использовать за 3 простых шага",
    featuresTitle: "Ключевые возможности и функции",
    faqTitle: "Часто задаваемые вопросы",
    relatedTitle: "Похожие инструменты",
    b1Title: "⚡ Мгновенная скорость",
    b1Desc: "Обрабатывайте данные и файлы прямо в браузере без задержек и очередей.",
    b2Title: "🔒 Полная безопасность и конфиденциальность",
    b2Desc: "Файлы не покидают ваше устройство. Обработка выполняется локально.",
    b3Title: "🎯 Высочайшее качество",
    b3Desc: "Передовые алгоритмы обеспечивают идеальный результат без потери качества.",
    b4Title: "💸 Без оплаты и ограничений",
    b4Desc: "Без регистрации, водяных знаков и скрытых платежей. Доступно всегда.",
    s1Title: "1. Загрузите файл или текст",
    s1Desc: "Перетащите файл в рабочую область или вставьте текст в поле ввода.",
    s2Title: "2. Настройте параметры",
    s2Desc: "Выберите качество, нужный формат или дополнительные настройки.",
    s3Title: "3. Скачайте результат",
    s3Desc: "Оцените результат в окне предпросмотра и скачайте файл в один клик.",
    q1: "Инструмент действительно бесплатный?",
    a1: "Да, абсолютно бесплатный, без водяных знаков и без необходимости регистрации.",
    q2: "В безопасности ли мои файлы?",
    a2: "Да, обработка происходит локально в вашем веб-браузере, на сервер ничего не отправляется.",
    q3: "Нужно ли устанавливать программы?",
    a3: "Нет, сервис работает онлайн в любом современном браузере на ПК и телефонах.",
    q4: "Есть ли ограничения на количество операций?",
    a4: "Ограничений нет, вы можете обрабатывать сколько угодно файлов.",
    catNames: {
      "Image Tools": "Инструменты для изображений",
      "PDF Tools": "Инструменты PDF",
      "Text Tools": "Работа с текстом",
      "Developer Tools": "Инструменты разработчика",
      "Generator Tools": "Генераторы",
      "Media Tools": "Медиа инструменты",
      "Utility Tools": "Полезные утилиты"
    }
  },
  tr: {
    free: "Ücretsiz",
    online: "Çevrimiçi",
    tool: "Araç",
    fastSecure: "Hızlı, Ücretsiz ve Güvenli",
    browserSafe: "%100 tarayıcınızda işlenir. Sunucuya hiçbir dosya yüklenmez.",
    home: "Anasayfa",
    tools: "Araçlar",
    search: "Araçlarda ara...",
    allCategories: "Tüm Kategoriler",
    selectLanguage: "Dil Seçin",
    benefitsTitle: "Neden Bizim Aracımızı Seçmelisiniz?",
    howToTitle: "3 Kolay Adımda Nasıl Kullanılır?",
    featuresTitle: "Öne Çıkan Özellikler",
    faqTitle: "Sıkça Sorulan Sorular",
    relatedTitle: "İlgili Çevrimiçi Araçlar",
    b1Title: "⚡ Işık Hızında İşlem",
    b1Desc: "Dosyalarınızı ve verilerinizi tarayıcınızda anında, beklemeden işleyin.",
    b2Title: "🔒 %100 Gizli ve Güvenli",
    b2Desc: "Dosyalarınız cihazınızdan asla ayrılmaz. Tüm işlemler tamamen yerel olarak yapılır.",
    b3Title: "🎯 Üstün Çıktı Kalitesi",
    b3Desc: "Gelişmiş algoritmalar ile minimum kayıp ve maksimum doğruluk sağlanır.",
    b4Title: "💸 Tamamen Ücretsiz",
    b4Desc: "Abonelik yok, filigran yok ve kayıt gerekmez. Sınırsız kullanın.",
    s1Title: "1. Dosya Yükleyin veya Yapıştırın",
    s1Desc: "Dosyanızı sürükleyip bırakın ya da metninizi doğrudan kutuya yapıştırın.",
    s2Title: "2. Ayarları Belirleyin",
    s2Desc: "İstediğiniz kaliteyi, formatı ve seçenekleri kolayca seçin.",
    s3Title: "3. İndirin veya Kopyalayın",
    s3Desc: "Sonucu önizleyin ve tek tıkla cihazınıza indirin.",
    q1: "Bu araç gerçekten ücretsiz mi?",
    a1: "Evet, hiçbir gizli ücret veya sınır olmadan tamamen ücretsizdir.",
    q2: "Verilerim ve dosyalarım güvende mi?",
    a2: "Kesinlikle. İşlemler tarayıcınızda yerel çalışır, sunucuya aktarılmaz.",
    q3: "Bir program kurmam gerekir mi?",
    a3: "Hayır, kurulum gerektirmez; telefon ve bilgisayar tarayıcısından direkt çalışır.",
    q4: "Kullanım limiti var mı?",
    a4: "Günlük kullanım limiti yoktur, dilediğiniz kadar dosya işleyebilirsiniz.",
    catNames: {
      "Image Tools": "Görsel Araçları",
      "PDF Tools": "PDF Araçları",
      "Text Tools": "Metin Araçları",
      "Developer Tools": "Geliştirici Araçları",
      "Generator Tools": "Üreticiler",
      "Media Tools": "Medya Araçları",
      "Utility Tools": "Faydalı Araçlar"
    }
  },
  id: {
    free: "Gratis",
    online: "Online",
    tool: "Alat",
    fastSecure: "Cepat, Gratis & Aman",
    browserSafe: "Diproses 100% di browser Anda. Tidak ada file yang diunggah ke server.",
    home: "Beranda",
    tools: "Alat",
    search: "Cari alat...",
    allCategories: "Semua Kategori",
    selectLanguage: "Pilih Bahasa",
    benefitsTitle: "Mengapa Memilih Alat Kami?",
    howToTitle: "Cara Menggunakan dalam 3 Langkah Mudah",
    featuresTitle: "Fitur Utama & Keunggulan",
    faqTitle: "Pertanyaan yang Sering Diajukan",
    relatedTitle: "Alat Terkait",
    b1Title: "⚡ Pemrosesan Secepat Kilat",
    b1Desc: "Proses file dan teks Anda secara instan di browser tanpa menunggu lama.",
    b2Title: "🔒 100% Aman & Privasi Terjaga",
    b2Desc: "File Anda tidak pernah keluar dari perangkat. Semuanya berjalan lokal.",
    b3Title: "🎯 Hasil Kualitas Maksimal",
    b3Desc: "Algoritma canggih memastikan hasil kompresi dan konversi terbaik.",
    b4Title: "💸 Gratis Selamanya",
    b4Desc: "Tanpa langganan, tanpa watermark, dan tanpa perlu mendaftar akun.",
    s1Title: "1. Unggah File atau Masukkan Teks",
    s1Desc: "Tarik dan lepas file ke area kerja atau tempel teks Anda langsung.",
    s2Title: "2. Sesuaikan Pengaturan",
    s2Desc: "Atur tingkat kualitas, pilih format target, dan sesuaikan opsi.",
    s3Title: "3. Unduh atau Salin",
    s3Desc: "Lihat pratinjau hasil seketika dan klik unduh untuk menyimpan file Anda.",
    q1: "Apakah alat ini benar-benar gratis?",
    a1: "Ya, 100% gratis tanpa biaya tersembunyi, tanda air, ataupun pendaftaran.",
    q2: "Apakah file saya aman?",
    a2: "Sangat aman. Pemrosesan dilakukan di sisi klien pada browser Anda.",
    q3: "Apakah saya perlu menginstal aplikasi?",
    a3: "Tidak perlu. Berjalan langsung di semua browser di HP maupun komputer.",
    q4: "Apakah ada batasan penggunaan?",
    a4: "Tidak ada batasan harian. Anda dapat menggunakannya sepuasnya.",
    catNames: {
      "Image Tools": "Alat Gambar",
      "PDF Tools": "Alat PDF",
      "Text Tools": "Alat Teks",
      "Developer Tools": "Alat Developer",
      "Generator Tools": "Alat Generator",
      "Media Tools": "Alat Media",
      "Utility Tools": "Utilitas Umum"
    }
  }
};

// Fallback helper to get dictionary for any of the 50 languages
export function getDictionary(langCode: string) {
  const code = langCode.toLowerCase();
  if (LANGUAGE_DICTIONARIES[code]) return LANGUAGE_DICTIONARIES[code];

  // Specific fallback overrides based on language groups
  if (code.startsWith('zh')) {
    return {
      ...LANGUAGE_DICTIONARIES.en,
      free: "免费",
      online: "在线",
      tool: "工具",
      fastSecure: "快速、免费且安全",
      browserSafe: "100%在您的浏览器中完成处理。无需上传任何文件到服务器。",
      home: "首页",
      tools: "所有工具",
      search: "搜索工具...",
      allCategories: "所有分类",
      selectLanguage: "选择语言",
      benefitsTitle: "为什么选择我们的在线工具？",
      howToTitle: "简单3步使用教程",
      featuresTitle: "核心功能与特点",
      faqTitle: "常见问题解答",
      relatedTitle: "相关工具推荐",
      b1Title: "⚡ 极速本地处理",
      b1Desc: "借助先进的浏览器端技术，免去上传等待，即刻完成文件与文本处理。",
      b2Title: "🔒 100% 隐私安全保障",
      b2Desc: "您的文件绝不离开您的设备。所有计算在本地内存中运行，绝对私密。",
      b3Title: "🎯 极致画质与精准度",
      b3Desc: "智能算法确保最优压缩比和高保真转换，输出结果无瑕疵。",
      b4Title: "💸 永久完全免费",
      b4Desc: "无需注册、无水印、无使用次数限制，随时随地尽情使用。",
      s1Title: "1. 上传或粘贴内容",
      s1Desc: "将文件拖放到工作区域，或直接在输入框中粘贴文字。",
      s2Title: "2. 设置处理参数",
      s2Desc: "轻松调节质量滑块、目标格式或各项自定义选项。",
      s3Title: "3. 预览并下载结果",
      s3Desc: "实时查看处理效果，一键下载或复制生成的内容到本地。",
      q1: "这个工具完全免费吗？",
      a1: "是的，工具100%免费，没有任何隐藏收费，无水印且无需注册。",
      q2: "我的数据和文件安全吗？",
      a2: "绝对安全。所有数据都在您的本地浏览器中处理，绝不上传到任何远程服务器。",
      q3: "需要安装客户端或插件吗？",
      a3: "完全不需要。支持所有主流桌面与移动浏览器，即开即用。",
      q4: "每天有使用次数或文件大小限制吗？",
      a4: "没有限制。您可以不受限制地处理任意数量的文件。",
      catNames: {
        "Image Tools": "图片处理工具",
        "PDF Tools": "PDF实用工具",
        "Text Tools": "文本处理工具",
        "Developer Tools": "开发者工具",
        "Generator Tools": "在线生成器",
        "Media Tools": "多媒体工具",
        "Utility Tools": "通用便捷工具"
      }
    };
  }

  // General fallback using target language native name
  const lang = getLanguage(code);
  const native = lang?.nativeName || code;
  return {
    ...LANGUAGE_DICTIONARIES.en,
    fastSecure: `${LANGUAGE_DICTIONARIES.en.fastSecure} (${native})`,
    selectLanguage: `Select Language (${native})`
  };
}

// Handcrafted & Nuqti-researched primary keywords and names for tools
export const TOOL_LOCAL_TERMS: Record<string, Record<string, { name: string; kw: string }>> = {
  'image-compressor': {
    es: { name: 'Compresor de Imágenes', kw: 'compresor de imagenes, reducir tamano foto, optimizar imagenes online, comprimir png gratis, comprimir jpg' },
    fr: { name: "Compresseur d'Images", kw: 'compresser image, reduire taille photo en ligne, compresseur jpg gratuit, optimiser image png' },
    de: { name: 'Bild Komprimierer', kw: 'bild komprimieren, fotos verkleinern online, jpg komprimieren kostenlos, bildgroesse reduzieren' },
    pt: { name: 'Compressor de Imagens', kw: 'comprimir imagem, reduzir tamanho da foto, diminuir tamanho de imagem online, comprimir jpg gratis' },
    it: { name: 'Compressore Immagini', kw: 'comprimere immagini, ridurre dimensione foto online, compressore jpg gratuito, ottimizzare foto' },
    ru: { name: 'Сжатие Изображений', kw: 'сжать фото онлайн, уменьшить размер изображения, сжатие фото без потери качества, компрессор картинок' },
    ja: { name: '画像圧縮ツール', kw: '画像 圧縮, 画像 容量 減らす, 写真 圧縮 無料, オンライン 画像 圧縮' },
    ko: { name: '이미지 압축기', kw: '이미지 압축, 사진 용량 줄이기, 사진 압축 무료, 온라인 이미지 최적화' },
    'zh-cn': { name: '图片压缩器', kw: '图片压缩, 在线压缩图片, 压缩照片大小, 无损压缩图片' },
    'zh-tw': { name: '圖片壓縮器', kw: '圖片壓縮, 線上壓縮圖片, 照片壓縮工具, 縮小照片容量' },
    ar: { name: 'ضاغط الصور أونلاين', kw: 'ضغط الصور, تقليل حجم الصورة, تصغير حجم الصور اون لاين, ضغط ملفات jpg' },
    hi: { name: 'इमेज कंप्रेसर', kw: 'फोटो का साइज कम करना, इमेज कंप्रेसर ऑनलाइन, फोटो कंप्रेस, फोटो साइज कम करने वाला' },
    tr: { name: 'Resim Boyutu Küçültme', kw: 'fotoğraf boyutu küçültme, resim sıkıştırma online, resim boyutu küçültme ücretsiz' },
    id: { name: 'Kompres Foto Online', kw: 'kompres foto, perkecil ukuran foto, kompres gambar online gratis' },
    nl: { name: 'Afbeeldingen Comprimeren', kw: 'afbeelding comprimeren, foto verkleinen online, foto mb verkleinen' },
    pl: { name: 'Kompresja Zdjęć', kw: 'kompresja zdjęć, zmniejszanie rozmiaru zdjęcia online, kompresor jpg' },
    vi: { name: 'Nén Ảnh Trực Tuyến', kw: 'nén ảnh, giảm dung lượng ảnh trực tuyến, nén ảnh online miễn phí' },
    th: { name: 'บีบอัดรูปภาพ', kw: 'บีบอัดรูปภาพ, ลดขนาดรูปภาพ ออนไลน์, ย่อขนาดรูปภาพ ฟรี' },
  },
  'pdf-to-jpg': {
    es: { name: 'Convertidor de PDF a JPG', kw: 'convertir pdf a jpg, pasar pdf a jpg gratis, convertir pdf a imagen online' },
    fr: { name: 'Convertisseur PDF en JPG', kw: 'convertir pdf en jpg, transformer pdf en image gratuit, extraire images pdf' },
    de: { name: 'PDF in JPG Umwandeln', kw: 'pdf in jpg umwandeln, pdf zu jpg konvertieren kostenlos, pdf als bild speichern' },
    pt: { name: 'Converter PDF para JPG', kw: 'converter pdf para jpg, transformar pdf em imagem gratis, pdf para jpg online' },
    it: { name: 'Convertitore PDF in JPG', kw: 'convertire pdf in jpg, trasforma pdf in immagini gratis, da pdf a jpg' },
    ru: { name: 'Конвертер PDF в JPG', kw: 'конвертировать pdf в jpg онлайн, перевести пдф в картинку, пдф в джипег' },
    ja: { name: 'PDF JPG 変換', kw: 'pdf jpg 変換, pdf 写真 変換 無料, pdf 画像化 オンライン' },
    ko: { name: 'PDF JPG 변환기', kw: 'pdf jpg 변환, pdf 이미지 변환 무료, pdf 사진으로 바꾸기' },
    'zh-cn': { name: 'PDF转JPG转换器', kw: 'pdf转jpg, 在线pdf转图片, 免费pdf转jpg格式' },
    'zh-tw': { name: 'PDF轉JPG轉換器', kw: 'pdf轉jpg, 線上pdf轉圖片, 免費pdf轉圖檔' },
    ar: { name: 'تحويل PDF إلى JPG', kw: 'تحويل pdf الى jpg, تحويل ملف pdf الى صور, تحويل بي دي اف الى صور مجانا' },
    hi: { name: 'PDF से JPG कनवर्टर', kw: 'pdf को फोटो कैसे बनाएं, pdf to jpg converter online, pdf से jpg में बदले' },
    tr: { name: 'PDF JPG Dönüştürücü', kw: 'pdf jpg dönüştürme, pdf yi resme çevirme online, pdf den resim çıkarma' },
    id: { name: 'Konversi PDF ke JPG', kw: 'ubah pdf ke jpg, convert pdf ke gambar online gratis' },
  },
  'qr-generator': {
    es: { name: 'Generador de Códigos QR', kw: 'generador de codigo qr, crear qr gratis, creador de codigos qr online' },
    fr: { name: 'Générateur de QR Code', kw: 'generateur qr code, creer qr code gratuit, generateur code qr en ligne' },
    de: { name: 'QR-Code Erstellen', kw: 'qr code erstellen, qr code generator kostenlos, eigenen qr code machen' },
    pt: { name: 'Gerador de QR Code', kw: 'gerador de qr code, criar qr code gratis, fazer qr code online' },
    it: { name: 'Generatore Codice QR', kw: 'generatore qr code, crea codice qr gratis, generatore qr online' },
    ru: { name: 'Генератор QR-кодов', kw: 'создать qr код онлайн, генератор qr кодов бесплатно, qr код сделать' },
    ja: { name: 'QRコード 作成', kw: 'qrコード 作成, qrコード リーダー 作成 無料, qrコード 発行' },
    ko: { name: 'QR 코드 생성기', kw: 'qr코드 만들기, qr코드 생성 무료, 큐알코드 만들기' },
    'zh-cn': { name: 'QR二维码生成器', kw: '二维码生成器, 在线制作二维码, 免费生成二维码' },
    'zh-tw': { name: 'QR二維碼生成器', kw: '二維碼生成器, 線上製作qr code, 免費產生qr code' },
    ar: { name: 'صانع باركود ورمز QR', kw: 'صانع باركود, انشاء باركود مجاني, عمل كود qr اون لاين' },
    hi: { name: 'QR कोड जनरेटर', kw: 'qr कोड कैसे बनाएं, qr code generator free, ऑनलाइन qr कोड बनाएं' },
    tr: { name: 'QR Kod Oluşturucu', kw: 'qr kod oluşturucu, karekod yapma online, ücretsiz qr kod yapıcı' },
    id: { name: 'Pembuat QR Code', kw: 'buat qr code gratis, buat barcode online, generator qr code' },
  },
  'word-counter': {
    es: { name: 'Contador de Palabras', kw: 'contador de palabras, contar caracteres online, contador de letras gratis' },
    fr: { name: 'Compteur de Mots', kw: 'compteur de mots, compter les caracteres en ligne, compteur de signes' },
    de: { name: 'Wortzähler', kw: 'wortzähler, wörter zählen online, zeichenzähler kostenlos' },
    pt: { name: 'Contador de Palavras', kw: 'contador de palavras, contar caracteres online, contador de letras' },
    it: { name: 'Conteggio Parole', kw: 'conteggio parole, conta caratteri online, calcolo parole testo' },
    ru: { name: 'Счетчик Слов', kw: 'посчитать количество слов, счетчик символов онлайн, подсчет знаков' },
    ja: { name: '文字数 カウント', kw: '文字数 カウント, 原稿用紙 文字数, 文字数チェッカー オンライン' },
    ko: { name: '글자수 세기', kw: '글자수 세기, 자소서 글자수 세기, 띄어쓰기 포함 글자수' },
    'zh-cn': { name: '字数统计器', kw: '字数统计, 在线字符统计, 文章字数计算' },
    'zh-tw': { name: '字數統計器', kw: '字數統計, 線上字數計算器, 文章字數計算' },
    ar: { name: 'عداد الكلمات والأحرف', kw: 'عداد الكلمات, حساب عدد الكلمات اون لاين, معرفة عدد الحروف' },
    hi: { name: 'शब्द गणक', kw: 'शब्द गणना, शब्द और अक्षर गिनना, ऑनलाइन वर्ड काउंटर' },
    tr: { name: 'Kelime Sayacı', kw: 'kelime sayacı, karakter sayma aracı online, harf sayacı' },
    id: { name: 'Penghitung Kata', kw: 'penghitung kata, hitung jumlah karakter online, kalkulator kata' },
  }
};

export function getToolName(slug: string, langCode: string): string {
  const code = langCode.toLowerCase();
  if (TOOL_LOCAL_TERMS[slug]?.[code]) {
    return TOOL_LOCAL_TERMS[slug][code].name;
  }
  const tool = TOOLS_MAP.get(slug);
  const englishName = tool?.name || slug;
  if (code === 'en') return englishName;

  const dict = getDictionary(code);
  // Auto-compose localized name if not explicitly registered
  return `${englishName} (${dict.free} & ${dict.online})`;
}

export function getToolKeywords(slug: string, langCode: string): string {
  const code = langCode.toLowerCase();
  if (TOOL_LOCAL_TERMS[slug]?.[code]) {
    return TOOL_LOCAL_TERMS[slug][code].kw;
  }
  const tool = TOOLS_MAP.get(slug);
  const name = tool?.name || slug;
  const dict = getDictionary(code);
  return `${name.toLowerCase()}, ${dict.free.toLowerCase()} ${name.toLowerCase()}, ${name.toLowerCase()} ${dict.online.toLowerCase()}, rovelin`;
}

export function getToolTranslation(slug: string, langCode: string): LocalizedToolContent {
  const dict = getDictionary(langCode);
  const tool = TOOLS_MAP.get(slug);
  const localizedName = getToolName(slug, langCode);
  const localizedKeywords = getToolKeywords(slug, langCode);

  const title = `${localizedName} - ${dict.free} & ${dict.online} | Rovelin`;
  const metaDescription = `${localizedName}: ${dict.browserSafe} ${dict.fastSecure}.`;
  const h1 = localizedName;
  const subtitle = `${dict.browserSafe} ${dict.fastSecure}.`;
  const badge = `${dict.free} • ${dict.online} • 100% Client-Side`;

  return {
    title,
    metaDescription,
    keywords: localizedKeywords,
    h1,
    subtitle,
    badge,
    benefitsTitle: dict.benefitsTitle,
    benefits: [
      { title: dict.b1Title, description: dict.b1Desc, icon: "⚡" },
      { title: dict.b2Title, description: dict.b2Desc, icon: "🔒" },
      { title: dict.b3Title, description: dict.b3Desc, icon: "🎯" },
      { title: dict.b4Title, description: dict.b4Desc, icon: "💸" },
    ],
    howToTitle: dict.howToTitle,
    howTo: [
      { step: 1, title: dict.s1Title, description: dict.s1Desc },
      { step: 2, title: dict.s2Title, description: dict.s2Desc },
      { step: 3, title: dict.s3Title, description: dict.s3Desc },
    ],
    featuresTitle: dict.featuresTitle,
    features: [
      dict.b1Desc,
      dict.b2Desc,
      dict.b3Desc,
      dict.b4Desc,
      dict.browserSafe,
      "No file limits, instant real-time results directly on your device."
    ],
    faqTitle: dict.faqTitle,
    faqs: [
      { question: dict.q1, answer: dict.a1 },
      { question: dict.q2, answer: dict.a2 },
      { question: dict.q3, answer: dict.a3 },
      { question: dict.q4, answer: dict.a4 },
    ],
    relatedTitle: dict.relatedTitle,
  };
}

export function getToolsIndexTranslation(langCode: string): LocalizedToolsIndex {
  const dict = getDictionary(langCode);
  const lang = getLanguage(langCode);
  const nativeName = lang?.nativeName || 'All Languages';

  return {
    title: `${dict.free} ${dict.online} ${dict.tools} | Rovelin Studio`,
    metaDescription: `Browse free online tools for images, PDF, text, developers, and generators. 100% private in your browser in ${nativeName}.`,
    keywords: `free online tools, developer tools, image tools, pdf tools, rovelin, ${dict.tools.toLowerCase()} ${dict.free.toLowerCase()}`,
    h1: `${dict.free} ${dict.online} ${dict.tools}`,
    subtitle: `${dict.browserSafe} ${dict.fastSecure}.`,
    searchPlaceholder: dict.search,
    allCategories: dict.allCategories,
    categoryNames: dict.catNames,
    totalToolsBadge: (count: number) => `${count} ${dict.tools}`,
    freeOnlineBadge: `${dict.free} & ${dict.online}`,
    popularTitle: `Popular ${dict.tools}`,
    openToolText: `Open ${dict.tool}`
  };
}

export function getUiTranslations(langCode: string): LocalizedUi {
  const dict = getDictionary(langCode);
  const lang = getLanguage(langCode);

  return {
    home: dict.home,
    tools: dict.tools,
    language: lang?.nativeName || 'Language',
    selectLanguage: dict.selectLanguage,
    searchLanguages: "Search languages...",
    close: "Close",
    currentLanguage: lang?.nativeName || 'English',
    switchPrompt: "Change language",
    footerRights: "All rights reserved."
  };
}
