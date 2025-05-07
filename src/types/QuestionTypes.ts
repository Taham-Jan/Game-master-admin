export type QuestionTypes = "text" | "image" | "video" | "audio";

export const AgeRanges = ["All", "Kids", "Normal", "Hard"];

export type AgeRangeType = (typeof AgeRanges)[number];

export type GetCategoryQuestionParams = {
  categoryId: string;
  questionType?: QuestionTypes;
  ageRange?: AgeRangeType;
};

export type CategoryQuestionCreatePayload = {
  categoryId: string;
  questionType: string;
  text?: {
    en: string;
    ar: string;
  };
  extraNotes?: {
    en: string;
    ar: string;
  };
  options: {
    [key: string]: {
      ar: string;
      en: string;
    };
  };
  media?: string;
  correctAnswer: string;
  ageRange: AgeRangeType[];
};

export type CategoryQuestionUpdatePayload = CategoryQuestionCreatePayload;
export interface CategoryQuestionResponse {
  _id: string;
  category: string;
  questionType: QuestionTypes;
  media: string;
  ageRange: AgeRangeType[];
  extraNotes?: {
    en: string;
    ar: string;
  };
  text: {
    en: string;
    ar: string;
  };
  options: {
    [key: string]: {
      ar: string;
      en: string;
    };
  };
  correctAnswer: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  __v: number;
}
