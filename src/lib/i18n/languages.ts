export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
  locale: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr', locale: 'en_US' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr', locale: 'es_ES' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr', locale: 'fr_FR' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr', locale: 'de_DE' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', dir: 'ltr', locale: 'pt_PT' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr', locale: 'it_IT' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr', locale: 'ru_RU' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr', locale: 'ja_JP' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr', locale: 'ko_KR' },
  { code: 'zh-cn', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳', dir: 'ltr', locale: 'zh_CN' },
  { code: 'zh-tw', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼', dir: 'ltr', locale: 'zh_TW' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl', locale: 'ar_SA' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr', locale: 'hi_IN' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr', locale: 'tr_TR' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr', locale: 'id_ID' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', dir: 'ltr', locale: 'nl_NL' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', dir: 'ltr', locale: 'pl_PL' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr', locale: 'vi_VN' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', dir: 'ltr', locale: 'th_TH' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', dir: 'ltr', locale: 'sv_SE' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', dir: 'ltr', locale: 'da_DK' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', dir: 'ltr', locale: 'fi_FI' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', dir: 'ltr', locale: 'nb_NO' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', dir: 'ltr', locale: 'cs_CZ' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', dir: 'ltr', locale: 'el_GR' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', dir: 'rtl', locale: 'he_IL' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', dir: 'ltr', locale: 'ro_RO' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', dir: 'ltr', locale: 'hu_HU' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', dir: 'ltr', locale: 'uk_UA' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', dir: 'ltr', locale: 'ms_MY' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', dir: 'rtl', locale: 'fa_IR' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', dir: 'ltr', locale: 'bn_BD' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', dir: 'ltr', locale: 'ta_IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', dir: 'ltr', locale: 'te_IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', dir: 'ltr', locale: 'mr_IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', dir: 'ltr', locale: 'gu_IN' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl', locale: 'ur_PK' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', dir: 'ltr', locale: 'sk_SK' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', dir: 'ltr', locale: 'bg_BG' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸', dir: 'ltr', locale: 'sr_RS' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', dir: 'ltr', locale: 'hr_HR' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹', dir: 'ltr', locale: 'lt_LT' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮', dir: 'ltr', locale: 'sl_SI' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪', dir: 'ltr', locale: 'et_EE' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻', dir: 'ltr', locale: 'lv_LV' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', dir: 'ltr', locale: 'sw_KE' },
  { code: 'fil', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭', dir: 'ltr', locale: 'fil_PH' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦', dir: 'ltr', locale: 'af_ZA' },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', flag: '🇪🇸', dir: 'ltr', locale: 'ca_ES' },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ тілі', flag: '🇰🇿', dir: 'ltr', locale: 'kk_KZ' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', flag: '🇦🇿', dir: 'ltr', locale: 'az_AZ' },
];

export const LOCALIZED_LANGUAGES = SUPPORTED_LANGUAGES.filter(l => l.code !== 'en');

export const LANGUAGE_MAP = new Map<string, Language>(
  SUPPORTED_LANGUAGES.map(lang => [lang.code.toLowerCase(), lang])
);

export function getLanguage(code: string): Language | undefined {
  return LANGUAGE_MAP.get(code.toLowerCase());
}

export function isValidLocale(code: string): boolean {
  return LANGUAGE_MAP.has(code.toLowerCase());
}

