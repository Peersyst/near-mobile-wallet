import { ReactElement, useContext } from "react";
import { Toast } from "../../Toast";
import { ToastContext } from "../ToastContext";

export function useToasterState(): ReactElement<typeof Toast> | undefined {
    const { toasts, removeToast } = useContext(ToastContext);

    const toast = toasts[0];

    if (toast) {
        const { message, props } = toast;
        const { onExited, ...rest } = props || {};

        return (
            <Toast
                message={message}
                {...rest}
                onExited={() => {
                    onExited?.();
                    removeToast();
                }}
            />
        );
    } else {
        return undefined;
    }
}
