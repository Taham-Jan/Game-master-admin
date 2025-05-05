import ApiService from "./ApiService";
import { UploadResponse } from "./UploadService";

export function GetMemesUrl() {
  return "/gameApp/getMemesForAdmin";
}

export function DeleteMemesUrl() {
  return "/gameApp/deleteMeme/";
}

export async function GetMemeTypes() {
  return ApiService.fetchData<string[]>({
    url: "/gameApp/getMemesType",
    method: "get",
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

export async function DeleteAllMemes() {
  return ApiService.fetchData<void>({
    url: "/gameApp/deleteAllMemes",
    method: "delete",
  });
}

export async function DeleteSelectedMemes(idx: string[]) {
  return ApiService.fetchData<void>({
    url: "/gameApp/deleteSelectedMemes/",
    method: "post",
    data: { idx },
  });
}
