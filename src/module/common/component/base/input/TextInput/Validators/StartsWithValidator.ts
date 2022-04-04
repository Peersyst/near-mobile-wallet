import { BaseValidator } from "./BaseValidator";
import { TranslateFn } from "./Validators.types";

export class StartsWithValidator extends BaseValidator {
    start: string;

    constructor(start: string, message: string | undefined, translate: TranslateFn) {
        super(message || translate("too_many_chars", { start }));
        this.start = start;
    }

    validate(value: string): boolean {
        return value.startsWith(this.start);
    }
}
