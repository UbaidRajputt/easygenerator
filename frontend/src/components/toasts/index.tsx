import { toast } from "react-toastify";

export const Toasts = {
  success: (message: string) => {
    const data = message || "some error occoured";
    return toast.success(data, {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  },

  error: (message: string) => {
    const data = message || "some error occoured";
    return toast.error(data, {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  },

  warn: (message: string) => {
    const data = message || "some error occoured";
    return toast.warn(data, {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  },

  info: (message: string) => {
    const data = message || "some error occoured";
    return toast.info(data, {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  },
};
