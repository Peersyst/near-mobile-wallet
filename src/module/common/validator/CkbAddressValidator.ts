import { BaseValidator } from "react-native-components";
import { translate } from "locale";

const CkbAddressRegex = new RegExp("^ckb[13][a-hj-np-zA-HJ-NP-Z2-9]{42}$");

export class CkbAddressValidator extends BaseValidator {
    constructor(message?: string) {
        super(message || translate("invalid_address"));
    }

    validate(value: string): boolean {
        return CkbAddressRegex.test(value);
    }
}
