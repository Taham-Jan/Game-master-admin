export interface GetCategoriesParams {
  name?: string;
}

export interface GetCategoriesResponse {
  _id: string;
  name: string;
  rules: string;
  icon: string;
  animation: string;
  background: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface IRulesIntro {
  english: string;
  arabic: string;
}

export type CreateCategoryPayload = {
  name: string;
  rules?: string;
  icon: string;
  rulesIntro: IRulesIntro;
  background: string;
};

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;

export interface CreateCategoryResponse {
  name: string;
  rules: string;
  icon: string;
  rulesIntro: IRulesIntro;
  background: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
