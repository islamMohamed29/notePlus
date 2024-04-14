import { toast } from "react-toastify";

const toastOptions = {
  position: "bottom-right",
  autoClose: 700,
  pauseOnHover: true,
  draggable: true,
  // theme: "light",
};

export const notifySuccess = (message) => {
  toast.success(message, toastOptions);
};

export const notifyError = (message) => {
  toast.error(message, toastOptions);
};
