import { BaseValidator } from "@peersyst/react-native-components";
import { TranslateFn } from "@peersyst/react-native-components";
import { NearSDKService } from "near-peersyst-sdk";

export class PrivateKeyValidator extends BaseValidator {
    constructor(message: string | undefined, translate: TranslateFn) {
        super(message || translate("invalid_private_key"));
    }

    validate(value: string): boolean {
        return NearSDKService.isSecretKeyValid(value);
    }
}
