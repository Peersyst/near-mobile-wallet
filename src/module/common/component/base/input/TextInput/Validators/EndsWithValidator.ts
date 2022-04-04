import { BaseValidator } from "./BaseValidator";
import { TranslateFn } from "./Validators.types";

export class EndsWithValidator extends BaseValidator {
    end: string;

    constructor(end: string, message: string | undefined, translate: TranslateFn) {
        super(message || translate("too_many_chars", { end }));
        this.end = end;
    }

    validate(value: string): boolean {
        return value.startsWith(this.end);
    }
}
