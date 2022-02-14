import { FunctionalValidator } from "../TextInput.types";
import { BaseValidator } from "./Validators/BaseValidator";
import { parseValidators } from "./ValidatorParser";
import { TranslateFn } from "./Validators.types";

export type CustomValidators = (BaseValidator | FunctionalValidator)[] | undefined;

export function getValidators(validators = "", customValidators: CustomValidators = [], translate: TranslateFn): BaseValidator[] {
    return parseValidators(validators, translate).concat(customValidators);
}
