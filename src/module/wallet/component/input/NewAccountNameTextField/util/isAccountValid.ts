import { NetworkType } from "module/common/types";
import { NearSDKService } from "near-peersyst-sdk";

export function isAccountValid(name: string, network: NetworkType): boolean {
    return NearSDKService.isImplicitAddressOrNameValid(name, network);
}
