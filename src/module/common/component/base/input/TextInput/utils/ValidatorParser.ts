import { NumberValidator } from "./Validators/NumberValidator";
import { EmailValidator } from "./Validators/EmailValidator";
import { NotNullValidator } from "./Validators/NotNullValidator";
import { BaseValidator } from "./Validators/BaseValidator";
import { PasswordValidator } from "./Validators/PasswordValidator";
import { EqualValidator } from "./Validators/EqualValidator";
import { TranslateFn } from "./Validators.types";

/**
 * Converts raw text validators into an array of Validator
 * example:
 * number error_message|gt0|lte1
 *
 * - number
 * - email
 * - gt + number (gt0)
 * - gte + number (gte0)
 * - eq + number (eq0)
 * - lt + number (lt0)
 * - lte + number (lte0)
 * @param rawValidators
 *
 * Translate function
 * @param translate
 */
export const parseValidators = (rawValidators: string, translate: TranslateFn): BaseValidator[] => {
    const validators = rawValidators.split("|");
    const parsedValidators: BaseValidator[] = [];
    for (const validator of validators) {
        const validatorElements = validator.split(":");
        const validatorText: string = validatorElements[0];
        const errorText: string | undefined = validatorElements[1];
        switch (true) {
            case validatorText === "number":
                parsedValidators.push(new NumberValidator(errorText, translate));
                break;
            case validatorText === "email":
                parsedValidators.push(new EmailValidator(errorText, translate));
                break;
            case validatorText === "not-null":
                parsedValidators.push(new NotNullValidator(errorText, translate));
                break;
            case validatorText === "password":
                parsedValidators.push(new PasswordValidator(errorText, translate));
                break;
            case /eq=.+/.test(validatorText):
                parsedValidators.push(new EqualValidator(errorText, translate, validatorText.replace("eq=", "")));
                break;
            case /gt[0-9]+/.test(validatorText):
                parsedValidators.push(
                    new NumberValidator(errorText, translate, {
                        greaterThan: Number(validatorText.replace("gt", "")),
                    }),
                );
                break;
            case /gte[0-9]+/.test(validatorText):
                parsedValidators.push(
                    new NumberValidator(errorText, translate, {
                        greaterEqualThan: Number(validatorText.replace("gte", "")),
                    }),
                );
                break;
            case /eq[0-9]+/.test(validatorText):
                parsedValidators.push(
                    new NumberValidator(errorText, translate, {
                        equalThan: Number(validatorText.replace("eq", "")),
                    }),
                );
                break;
            case /lt[0-9]+/.test(validatorText):
                parsedValidators.push(
                    new NumberValidator(errorText, translate, {
                        lowerThan: Number(validatorText.replace("lt", "")),
                    }),
                );
                break;
            case /lte[0-9]+/.test(validatorText):
                parsedValidators.push(
                    new NumberValidator(errorText, translate, {
                        lowerEqualThan: Number(validatorText.replace("lte", "")),
                    }),
                );
                break;
        }
    }
    return parsedValidators;
};
