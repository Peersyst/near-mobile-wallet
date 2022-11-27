import { NetworkType } from "module/settings/state/SettingsState";
import { NearSDKService } from "near-peersyst-sdk";

export interface BaseNearSdkParms {
    nodeUrl: string;
    indexerUrl: string;
}

export interface SetServiceParams {
    serviceIndex: number;
    network: NetworkType;
    service: NearSDKService;
}

export interface CreateServiceInstanceParams extends Omit<SetServiceParams, "service"> {
    mnemonic?: string;
    nameId?: string;
    privateKey?: string;
}
