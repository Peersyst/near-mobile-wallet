import { FormEvent, useCallback, useState } from "react";
import { FieldState } from "../Form.types";

export interface UseFormSubmitResult {
    submitted: boolean;
    handleSubmit: () => void;
}

export default function useFormSubmit(
    data: Record<string, FieldState>,
    onSubmit: (data: any) => any,
    onInvalid?: () => any,
): UseFormSubmitResult {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = useCallback(
        (e?: FormEvent): void => {
            e?.preventDefault();
            if (!submitted) {
                setSubmitted(true);
            }
            setImmediate(() => {
                const valid = Object.values(data).every((v) => v.valid);
                if (valid) {
                    const values: Record<string, any> = {};
                    Object.entries(data).forEach((v) => (values[v[0]] = v[1].value));
                    onSubmit(values);
                } else onInvalid?.();
            });
        },
        [data, submitted, onSubmit, onInvalid],
    );

    return { submitted, handleSubmit };
}
