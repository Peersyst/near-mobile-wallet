import { useEffect, useState } from "react";
import { CustomValidators, getValidators } from "../utils/getValidators";
import { useTheme } from "@peersyst/react-native-styled";

export interface TextInputValidationResult {
    valid: boolean;
    errors: string[];
}

export function useTextInputValidation(
    value: string,
    rawValidators?: string,
    customValidators?: CustomValidators,
    onInvalid?: (errors: string[]) => any,
): TextInputValidationResult {
    const [valid, setValid] = useState<boolean>(true);
    const [errors, setErrors] = useState<string[]>([]);

    const { translate } = useTheme();

    useEffect(() => {
        const newErrors: string[] = [];
        const validators = getValidators(rawValidators, customValidators, translate);

        for (const validator of validators) {
            const valid = validator.validate(value);
            if (!valid) newErrors.push(validator.message);
        }

        const invalid = newErrors.length > 0;
        setValid(!invalid);
        setErrors(newErrors);

        if (invalid) onInvalid?.(newErrors);
    }, [value, rawValidators, customValidators, onInvalid, translate]);

    return { valid, errors };
}
