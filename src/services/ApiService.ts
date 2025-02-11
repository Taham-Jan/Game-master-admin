import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import BaseService from "./BaseService";
import { showNotificationMessage } from "../utils/toast";

const ApiService = {
  async fetchData<Response = unknown, Request = Record<string, unknown>>(
    param: AxiosRequestConfig<Request>
  ): Promise<AxiosResponse<Response>> {
    try {
      if (param.data instanceof FormData) {
        delete param.headers?.["Content-Type"];
      }

      const response = await BaseService(param);
      return response;
    } catch (errors) {
      const errorMessage = await this.extractErrorMessage(errors, param);
      showNotificationMessage("Failure", errorMessage, "error");
      console.error("API Error:", errors);
      throw errors;
    }
  },

  async extractErrorMessage(errors: AxiosError, param: AxiosRequestConfig) {
    let errorMessage = "Something went wrong";

    if (errors.response) {
      if (
        param.responseType === "blob" &&
        errors.response.data instanceof Blob
      ) {
        try {
          const text = await errors.response.data.text();
          const data = JSON.parse(text) as {
            msg?: string;
            message?: string;
            errors?: string[];
          };
          errorMessage =
            data?.msg || data?.message || data?.errors?.[0] || errorMessage;
        } catch (e) {
          errorMessage = `Failed to parse error response ${e}`;
        }
      } else {
        const errorData = errors.response.data as {
          msg?: string;
          message?: string;
          errors?: string[];
        };
        errorMessage =
          errorData?.msg ||
          errorData?.message ||
          errorData?.errors?.[0] ||
          errors.message ||
          errorMessage;
      }
    }

    return errorMessage;
  },
};

export default ApiService;
