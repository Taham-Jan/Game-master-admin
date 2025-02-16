import { ApiResponse } from "../types/ApiResponse";
import ApiService from "./ApiService";

interface UploadResponse {
  url: string;
  message: string;
}

export async function uploadFile(data: any, controller?: AbortController) {
  return ApiService.fetchData<UploadResponse>({
    url: "/gameApp/upload",
    method: "post",
    data,
    signal: controller?.signal,
  });
}
