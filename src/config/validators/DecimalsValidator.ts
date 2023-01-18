import { BaseValidator } from "@peersyst/react-native-components";
import { TranslateFn } from "@peersyst/react-native-components";

export class DecimalsValidator extends BaseValidator {
    private decimals: number;
    constructor(message: string | undefined, translate: TranslateFn, decimals: number | string) {
        super(message || translate("invalid_max_decimals", { maxDecimals: decimals }));
        this.decimals = parseInt(decimals.toString(), 10);
    }

    validate(value: string): boolean {
        const dec = value.split(".")?.[1];
        return dec ? dec.length <= this.decimals : true;
    }
}
