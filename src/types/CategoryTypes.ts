interface ITrans {
  english: string;
  arabic: string;
}
export interface GetCategoriesParams {
  name?: string;
}

export interface GetCategoriesResponse {
  name: string;
  nameAR: string;
  rules?: string;
  rulesAR?: string;
  icon: string;
  animation: string;
  background: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type CreateCategoryPayload = {
  name: string;
  nameAR: string;
  rules?: string;
  rulesAR?: string;
  icon: string;
  rulesIntro: ITrans;
  background: string;
};

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;

export interface CreateCategoryResponse {
  name: string;
  nameAR: string;
  rules?: string;
  rulesAR?: string;
  icon: string;
  rulesIntro: ITrans;
  background: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
