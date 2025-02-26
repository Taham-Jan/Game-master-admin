import { ApiResponse } from "../types/ApiResponse";
import {
  CategoryQuestionCreatePayload,
  CategoryQuestionResponse,
  CategoryQuestionUpdatePayload,
} from "../types/QuestionTypes";
import ApiService from "./ApiService";
import { UploadResponse } from "./UploadService";

export function GetCategoryQuestionUrl() {
  return "/gameApp/getQuestions";
}

export function GetCategoryQuestionDeleteUrl() {
  return "/gameApp/deletequetion/";
}

export async function uploadCsvQuestions(data: any) {
  return ApiService.fetchData<void>({
    url: "/gameApp/createquestion",
    method: "post",
    data,
  });
}

export async function getCategoryQuestionById(id: string) {
  return ApiService.fetchData<ApiResponse<CategoryQuestionResponse>>({
    url: "/gameApp/getquestionbyId/" + id,
    method: "get",
  });
}

export async function createNewCategoryQuestion(
  data: CategoryQuestionCreatePayload
) {
  return ApiService.fetchData<CategoryQuestionResponse>({
    url: "/gameApp/createQuestionbyself",
    method: "post",
    data,
  });
}

export async function updateCategoryQuestion(
  id: string,
  data: CategoryQuestionUpdatePayload
) {
  return ApiService.fetchData<CategoryQuestionResponse>({
    url: "/gameApp/Editquestion",
    method: "patch",
    data: { ...data, _id: id },
  });
}

export async function createNewMeme(data: any, controller?: AbortController) {
  return ApiService.fetchData<UploadResponse>({
    url: "/gameApp/createMeme",
    method: "post",
    data,
    signal: controller?.signal,
  });
}
