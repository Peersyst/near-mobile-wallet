import { BaseValidator } from "./BaseValidator";
import { TranslateFn } from "./Validators.types";

export class MaxCharsValidator extends BaseValidator {
    chars: number;

    constructor(chars: number, message: string | undefined, translate: TranslateFn) {
        super(message || translate("too_many_chars", { chars: chars.toString() }));
        this.chars = chars;
    }

    validate(value: string): boolean {
        return value.length <= this.chars;
    }
}
