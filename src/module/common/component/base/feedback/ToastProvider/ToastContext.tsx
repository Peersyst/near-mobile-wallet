import { createContext } from "react";
import { ToastContextType } from "./ToastProvider.types";

export const ToastContext = createContext<ToastContextType>({
    showToast: () => undefined,
    hideToast: () => undefined,
    removeToast: () => undefined,
    toasts: [],
});

export const ToastConsumer = ToastContext.Consumer;
