import { BaseValidator } from "@peersyst/react-native-components";
import { TranslateFn } from "@peersyst/react-native-components";
import { NearSDKService } from "near-peersyst-sdk";

export class AddressValidator extends BaseValidator {
    constructor(message: string | undefined, translate: TranslateFn) {
        super(message || translate("invalid_address"));
    }

    validate(value: string): boolean {
        return NearSDKService.isImplicitAddressOrNameValid(value);
    }
}
