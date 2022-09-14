import { BaseValidator } from "@peersyst/react-native-components";
import { ConnectionService, Environments } from "module/sdk";
import { TranslateFn } from "@peersyst/react-native-components";

export class CkbAddressValidator extends BaseValidator {
    network: Environments;

    constructor(message: string | undefined, translate: TranslateFn, network: Environments) {
        super(message || translate("invalid_address"));
        this.network = network;
    }

    validate(value: string): boolean {
        return ConnectionService.isAddress(this.network, value);
    }
}
