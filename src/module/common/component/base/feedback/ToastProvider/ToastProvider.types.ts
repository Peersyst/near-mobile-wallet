import { ToastProps } from "../Toast";

export type ToasterToastProps = Omit<ToastProps, "message"> & { key?: number };
export type ShowToastProps = Omit<ToastProps, "message" | "open">;

export interface ToastContextType {
    showToast: (message: string, props?: ShowToastProps) => unknown;
    hideToast: () => unknown;
    removeToast: () => unknown;
    toasts: ToasterState;
}

export interface ToasterToast {
    message: string;
    props?: ToasterToastProps;
}

export type ToasterState = ToasterToast[];

export enum ToasterActionType {
    SHOW_TOAST,
    HIDE_TOAST,
    REMOVE_TOAST,
}

export interface ShowToastAction {
    type: ToasterActionType.SHOW_TOAST;
    payload: { message: string; props?: ShowToastProps };
}

export interface HideToastAction {
    type: ToasterActionType.HIDE_TOAST;
}

export interface RemoveToastAction {
    type: ToasterActionType.REMOVE_TOAST;
}

export type ToasterAction = ShowToastAction | HideToastAction | RemoveToastAction;
