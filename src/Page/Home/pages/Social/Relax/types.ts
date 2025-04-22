export type Language = 'english' | 'hindi' | 'gujarati';

export interface YogaPose {
  name: string;
  sanskritName: string;
  image: string;
  steps: string[];
  benefits: string[];
  difficulty: string;
  duration: string;
}

export interface YogaContentType {
  title: string;
  description: string;
  poses: YogaPose[];
}

export type YogaContentData = {
  [key in Language]: YogaContentType;
}; 