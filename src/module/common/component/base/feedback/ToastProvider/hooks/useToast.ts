import { ToastContextType } from "../ToastProvider.types";
import { useContext } from "react";
import { ToastContext } from "../ToastContext";

export interface UseToastResult {
    showToast: ToastContextType["showToast"];
    hideToast: ToastContextType["hideToast"];
}

export function useToast(): UseToastResult {
    const { showToast, hideToast } = useContext(ToastContext);
    return { showToast, hideToast };
}
