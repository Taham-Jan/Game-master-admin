import { ApiResponse } from "../types/ApiResponse";
import {
  createRoundTypePayload,
  IRoundManager,
  updateRoundTypePayload,
} from "../types/RoundManagerTypes";
import ApiService from "./ApiService";

export async function GetMiniGames() {
  return ApiService.fetchData<ApiResponse<string[]>>({
    url: "/gameApp/getMiniGames",
    method: "get",
  });
}

export async function GetRoundManager() {
  return ApiService.fetchData<ApiResponse<IRoundManager>>({
    url: "/gameApp/getRound",
    method: "get",
  });
}

export async function CreateRoundManager(data: createRoundTypePayload) {
  return ApiService.fetchData<ApiResponse<IRoundManager>>({
    url: "/gameApp/createRound",
    method: "post",
    data,
  });
}
export async function UpdateRoundManager(
  data: updateRoundTypePayload,
  roundManagerId: string
) {
  return ApiService.fetchData<ApiResponse<IRoundManager>>({
    url: "/gameApp/updateRound",
    method: "patch",
    data: { ...data, _id: roundManagerId },
  });
}
