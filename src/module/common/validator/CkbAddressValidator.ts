import { BaseValidator } from "react-native-components";
import { translate } from "locale";

const CkbAddressRegex = new RegExp("^ckb[13][a-zA-Z0-9]{42}$");

export class CkbAddressValidator extends BaseValidator {
    constructor(message?: string) {
        super(message || translate("invalid_address"));
    }

    validate(value: string): boolean {
        return CkbAddressRegex.test(value);
    }
}
