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

export type CreateCategoryPayload = {
  name: string;
  rules: string;
  icon: string;
  animation: string;
  background: string;
};

export interface CreateCategoryResponse {
  name: string;
  rules: string;
  icon: string;
  animation: string;
  background: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
