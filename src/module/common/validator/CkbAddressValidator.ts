import { BaseValidator } from "react-native-components";
import { translate } from "locale";
import { ConnectionService, Environments } from "module/sdk";

export class CkbAddressValidator extends BaseValidator {
    network: Environments;
    constructor(network: Environments, message?: string) {
        super(message || translate("invalid_address"));
        this.network = network;
    }

    validate(value: string): boolean {
        return ConnectionService.isAddress(this.network, value);
    }
}
