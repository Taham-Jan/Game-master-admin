import axios from "axios";
import Datahandle from "./Datahandle";
import { showNotificationMessage } from "../utils/toast";

const handleHttpReq = async <T>(
  fn: (controller: AbortController) => Promise<T>,
  loaderText: string = "Loading"
): Promise<T | undefined> => {
  const controller = new AbortController();

  try {
    Datahandle.getTopLoaderRef()?.show(loaderText, controller);
    return await fn(controller);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      console.error(error);
      showNotificationMessage(
        "Error",
        error instanceof Error ? error.message : "An unknown error occurred",
        "error"
      );
    }
  } finally {
    Datahandle.getTopLoaderRef()?.hide();
  }

  return undefined;
};

export { handleHttpReq };
