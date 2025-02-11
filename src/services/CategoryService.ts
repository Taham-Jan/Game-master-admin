import {
  CreateCategoryPayload,
  CreateCategoryResponse,
} from "../types/CategoryTypes";
import ApiService from "./ApiService";

export function getCategoriesListUrl() {
  return "/gameapp/getcategories";
}

export async function CreateNewCategory(data: CreateCategoryPayload) {
  return ApiService.fetchData<CreateCategoryResponse>({
    url: "/gameApp/createcategory",
    method: "post",
    data,
  });
}
