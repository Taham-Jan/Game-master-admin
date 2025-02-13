import Datahandle from "./Datahandle";
import { showNotificationMessage } from "./toast";

const handleHttpReq = async (fn: () => void) => {
  try {
    // new Promise((resolve) => setTimeout(() => {}, 3000))
    Datahandle.getTopLoaderRef()?.show();

    // await new Promise((resolve) => setTimeout(resolve, 3000))

    return await fn();
  } catch (error) {
    console.log(error);

    showNotificationMessage("Error", error, "error");
  } finally {
    Datahandle.getTopLoaderRef()?.hide();
  }
};
export { handleHttpReq };
