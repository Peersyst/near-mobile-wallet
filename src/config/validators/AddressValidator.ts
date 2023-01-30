import { BaseValidator } from "@peersyst/react-native-components";
import { TranslateFn } from "@peersyst/react-native-components";
import { NetworkType } from "module/settings/state/SettingsState";
import { isAccountValid } from "module/wallet/component/input/NewAccountNameTextField/util/IsAccountValid";

export class AddressValidator extends BaseValidator {
    private network: NetworkType;
    constructor(message: string | undefined, translate: TranslateFn, network: NetworkType) {
        super(message || translate("invalid_address"));
        this.network = network;
    }

    validate(value: string): boolean {
        return isAccountValid(value, this.network);
    }
}
