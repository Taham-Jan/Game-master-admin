import { AgeRangeType, QuestionTypes } from "../types/QuestionTypes";
import ApiService from "./ApiService";

export function GetCategoryQuestionUrl() {
  return "/gameApp/getQuestions";
}

export async function uploadCsvQuestions(data: any) {
  return ApiService.fetchData<void>({
    url: "/gameApp/createquestion",
    method: "post",
    data,
  });
}
