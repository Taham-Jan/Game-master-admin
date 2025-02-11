import { toast } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning";

export const showNotificationMessage = (
  title: string,
  message: string,
  type: ToastType = "info",
  position:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left" = "bottom-right"
) => {
  toast(message, {
    type,
    position: position,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
