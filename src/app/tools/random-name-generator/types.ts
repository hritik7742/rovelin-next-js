export type NameGender = 'male' | 'female' | 'neutral';
export type NameStyle = 
  | 'modern' | 'fantasy' | 'sci-fi' | 'ancient' | 'cute'  // General Styles
  | 'chinese' | 'japanese' | 'korean' | 'vietnamese'      // Asian Names
  | 'french' | 'german' | 'greek' | 'italian' | 'russian' | 'swedish'  // European Names
  | 'arabic' | 'brazilian' | 'indian' | 'spanish';        // Other Regions

export interface NameData {
  [key: string]: {
    [key in NameGender]: string[];
  };
}

export interface NameRule {
  maxLength: number;
  minLength: number;
  allowedCharacters: RegExp;
  [key: string]: any;
}

export interface NameFormat {
  format: string;
  separator: string;
  capitalization: 'first_letter' | 'all_caps' | 'all_lower';
  [key: string]: any;
} 