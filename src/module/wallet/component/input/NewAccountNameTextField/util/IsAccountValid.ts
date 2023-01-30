import { NetworkType } from "module/settings/state/SettingsState";
import { NearSDKService } from "near-peersyst-sdk";

export function isAccountValid(name: string, network: NetworkType): boolean {
    return NearSDKService.isImplicitAddressOrNameValid(name, network);
}
