import { BaseValidator } from "./BaseValidator";
import { TranslateFn } from "../Validators.types";

export interface NumberValidatorOptions {
    greaterThan?: number;
    greaterEqualThan?: number;
    equalThan?: number;
    lowerThan?: number;
    lowerEqualThan?: number;
}

export class NumberValidator extends BaseValidator {
    private readonly options: NumberValidatorOptions = {};

    constructor(message: string | undefined, translate: TranslateFn, options: NumberValidatorOptions = {}) {
        super(message || translate("invalid_number"));

        this.options = options;

        if (!message) {
            if (options.greaterThan !== undefined) {
                this.message = translate("invalid_number_gt").replace("{n}", options.greaterThan.toString());
            }
            if (options.greaterEqualThan !== undefined) {
                this.message = translate("invalid_number_gte").replace("{n}", options.greaterEqualThan.toString());
            }
            if (options.equalThan !== undefined) {
                this.message = translate("invalid_number_eq").replace("{n}", options.equalThan.toString());
            }
            if (options.lowerThan !== undefined) {
                this.message = translate("invalid_number_lt").replace("{n}", options.lowerThan.toString());
            }
            if (options.lowerEqualThan !== undefined) {
                this.message = translate("invalid_number_lte").replace("{n}", options.lowerEqualThan.toString());
            }
        }
    }

    validate(value: string): boolean {
        const parsed = Number(value);
        if (isNaN(parsed)) return false;
        else if (value === "") return true;
        let valid = true;
        if (this.options.greaterThan !== undefined) {
            const stepValid = parsed > this.options.greaterThan;
            valid = valid && stepValid;
        }
        if (this.options.greaterEqualThan !== undefined) {
            const stepValid = parsed >= this.options.greaterEqualThan;
            valid = valid && stepValid;
        }
        if (this.options.equalThan !== undefined) {
            const stepValid = parsed === this.options.equalThan;
            valid = valid && stepValid;
        }
        if (this.options.lowerThan !== undefined) {
            const stepValid = parsed < this.options.lowerThan;
            valid = valid && stepValid;
        }
        if (this.options.lowerEqualThan !== undefined) {
            const stepValid = parsed <= this.options.lowerEqualThan;
            valid = valid && stepValid;
        }
        return valid;
    }
}
