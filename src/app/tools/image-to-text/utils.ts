import Tesseract from 'tesseract.js';
import type { LanguageCode } from './languages';

export const validateFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please upload an image file');
  }
  
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File size should be less than 10MB');
  }
  
  return true;
};

export const processImage = async (
  imageFile: File,
  language: LanguageCode,
  progressCallback: (progress: number) => void
): Promise<string> => {
  try {
    const result = await Tesseract.recognize(
      imageFile,
      language,
      {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            progressCallback(Math.round(m.progress * 100));
          }
        }
      }
    );

    return result.data.text;
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to extract text from image');
  }
}; 