import { BaseValidator } from "react-native-components";
import { translate } from "locale";

const CkbAddressRegex = new RegExp("^ckb[13][a-zA-Z0-9]{42}$");
const CkbAddressRegex2 = new RegExp("^ckt[13][a-zA-Z0-9]{93}$");

export class CkbAddressValidator extends BaseValidator {
    constructor(message?: string) {
        super(message || translate("invalid_address"));
    }

    validate(value: string): boolean {
        return CkbAddressRegex.test(value) || CkbAddressRegex2.test(value);
    }
}
