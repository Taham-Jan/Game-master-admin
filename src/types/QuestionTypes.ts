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

export interface CategoryQuestionResponse {
  _id: string;
  category: string;
  questionType: string;
  media: string;
  ageRange: string;
  text: {
    en: string;
    ar: string;
  };
  options: {
    [key: string]: {
      ar: string;
      en: string;
      isCorrect: boolean;
    };
  };

  createdAt: Date | string;
  updatedAt: Date | string;
  __v: number;
}
