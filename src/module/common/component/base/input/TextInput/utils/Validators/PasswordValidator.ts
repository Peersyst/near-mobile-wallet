import { BaseValidator } from "./BaseValidator";
import { TranslateFn } from "../Validators.types";

export class PasswordValidator extends BaseValidator {
    constructor(message: string | undefined, translate: TranslateFn) {
        super(message || translate("invalid_password"));
    }

    validate(value: string): boolean {
        const regex = /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).*/g;
        return regex.test(value);
    }
}
