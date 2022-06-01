import { ToastContextType } from "../ToastProvider.types";
import { useContext } from "react";
import { ToastContext } from "../ToastContext";

export interface UseToastResult {
    showToast: ToastContextType["showToast"];
    hideToast: ToastContextType["hideToast"];
    toastActive: boolean;
}

export function useToast(): UseToastResult {
    const { showToast, hideToast, toasts } = useContext(ToastContext);
    return { showToast, hideToast, toastActive: toasts.length > 0 };
}
