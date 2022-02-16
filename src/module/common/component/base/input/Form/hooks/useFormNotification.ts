import { useContext, useEffect } from "react";
import { FormContext } from "../FormContext";

export function useFormNotification(name: string | undefined, value: unknown, valid = true): void {
    const { notifyForm } = useContext(FormContext);

    useEffect(() => {
        name && notifyForm?.({ name, value, valid });
    }, [value, valid, notifyForm, name]);
}
