import { BaseValidator } from "react-native-components";
import { translate } from "locale";

const RippleAddressRegex = new RegExp("^r[1-9a-km-zA-HJ-NP-Z]{24,34}$");

export class RippleAddressValidator extends BaseValidator {
    constructor(message?: string) {
        super(message || translate("invalid_address"));
    }

    validate(value: string): boolean {
        return RippleAddressRegex.test(value);
    }
}
