import { TranslateFn, Validator, Validators, ValidatorFactory } from "./Validators.types";
import { BaseValidator } from "./BaseValidator";
import { NotNullValidator } from "module/common/component/base/input/TextInput/Validators/NotNullValidator";
import { NumberValidator } from "module/common/component/base/input/TextInput/Validators/NumberValidator";
import { EmailValidator } from "module/common/component/base/input/TextInput/Validators/EmailValidator";
import { PasswordValidator } from "module/common/component/base/input/TextInput/Validators/PasswordValidator";
import { EqualValidator } from "module/common/component/base/input/TextInput/Validators/EqualValidator";
import { MinCharsValidator } from "module/common/component/base/input/TextInput/Validators/MinCharsValidator";
import { MaxCharsValidator } from "module/common/component/base/input/TextInput/Validators/MaxCharsValidator";
import { StartsWithValidator } from "module/common/component/base/input/TextInput/Validators/StartsWithValidator";
import { EndsWithValidator } from "module/common/component/base/input/TextInput/Validators/EndsWithValidator";
import { ExtraValidators } from "../../../style/theme.types";

export const parseValidator = (
    validator: keyof Validators & keyof ExtraValidators,
    param: Validator<unknown>,
    extraValidators: Record<keyof ExtraValidators, ValidatorFactory<unknown>>,
    translate: TranslateFn,
): BaseValidator => {
    const [value, message] = Array.isArray(param) ? param : [param, undefined];

    switch (validator) {
        case "required":
            return new NotNullValidator(message, translate);
        case "number":
            return new NumberValidator(message, translate);
        case "email":
            return new EmailValidator(message, translate);
        case "password":
            return new PasswordValidator(message, translate);
        case "eq":
            return new EqualValidator(message, translate, value);
        case "gt":
            return new NumberValidator(message, translate, { greaterThan: value });
        case "gte":
            return new NumberValidator(message, translate, { greaterEqualThan: value });
        case "lt":
            return new NumberValidator(message, translate, { lowerThan: value });
        case "lte":
            return new NumberValidator(message, translate, { lowerEqualThan: value });
        case "minChars":
            return new MinCharsValidator(value, message, translate);
        case "maxChars":
            return new MaxCharsValidator(value, message, translate);
        case "startsWith":
            return new StartsWithValidator(value, message, translate);
        case "endsWith":
            return new EndsWithValidator(value, message, translate);
        default:
            return (extraValidators[validator] as ValidatorFactory)({ value, message });
    }
};

export default function (
    validators: Validators & Partial<ExtraValidators>,
    extraValidators: Record<keyof ExtraValidators, ValidatorFactory<unknown>>,
    translate: TranslateFn,
): BaseValidator[] {
    return Object.entries(validators).map(([key, param]) =>
        parseValidator(key as keyof Validators & keyof ExtraValidators, param, extraValidators, translate),
    );
}
