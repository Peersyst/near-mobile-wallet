import { BaseValidator } from "react-native-components";
import { translate } from "locale";
import { connectionService } from "../service/CkbSdkService";

export class CkbAddressValidator extends BaseValidator {
    constructor(message?: string) {
        super(message || translate("invalid_address"));
    }

    validate(value: string): boolean {
        return connectionService.isAddress(value);
    }
}
