import { ApiResponse } from "../types/ApiResponse";
import {
  CreateCategoryPayload,
  CreateCategoryResponse,
} from "../types/CategoryTypes";
import ApiService from "./ApiService";

export function getCategoriesListUrl() {
  return "/gameapp/getcategories";
}

export function getCategoriesDeleteUrl() {
  return "/gameapp/deletecategory/";
}

export async function CreateNewCategory(data: CreateCategoryPayload) {
  return ApiService.fetchData<ApiResponse<CreateCategoryResponse>>({
    url: "/gameApp/createcategory",
    method: "post",
    data,
  });
}

export async function GetCategoryById(categoryId: string) {
  return ApiService.fetchData<ApiResponse<CreateCategoryResponse>>({
    url: "/gameApp/getcategorybyId/" + categoryId,
    method: "get",
  });
}

export async function UpdateNewCategory(
  categoryId: string,
  data: CreateCategoryPayload
) {
  return ApiService.fetchData<ApiResponse<CreateCategoryResponse>>({
    url: "/gameApp/editCategory",
    method: "patch",
    data: { _id: categoryId, ...data },
  });
}
