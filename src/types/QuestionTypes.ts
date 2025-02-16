export type QuestionTypes = "text" | "image" | "video" | "audio";

export const AgeRanges = [
  "6-12",
  "13-18",
  "19-30",
  "31-45",
  "45 Above",
] as const;

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
  options: {
    [key: string]: {
      ar: string;
      en: string;
    };
  };
  media?: string;
  correctAnswer: string;
  ageRange: AgeRangeType;
};

export type CategoryQuestionUpdatePayload = CategoryQuestionCreatePayload;
export interface CategoryQuestionResponse {
  _id: string;
  category: string;
  questionType: QuestionTypes;
  media: string;
  ageRange: AgeRangeType;
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
