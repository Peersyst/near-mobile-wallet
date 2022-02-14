import { BaseValidator } from "./BaseValidator";
import { TranslateFn } from "../Validators.types";

export class EqualValidator extends BaseValidator {
    constructor(message: string | undefined, translate: TranslateFn, private readonly compare: string) {
        super(message || translate("invalid_equal"));
    }

    validate(value: string): boolean {
        return value === this.compare;
    }
}
