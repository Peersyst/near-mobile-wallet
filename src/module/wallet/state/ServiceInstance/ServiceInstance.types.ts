import { NetworkType } from "module/settings/state/SettingsState";
import { NearSDKService } from "near-peersyst-sdk";

export interface BaseNearSdkParms {
    nodeUrl: string;
    indexerUrl: string;
}

export interface BaseSetServiceParams {
    network: NetworkType;
}

export interface SetServicesParams extends BaseSetServiceParams {
    services: NearSDKService[];
}

export interface AddServiceParams extends BaseSetServiceParams {
    service: NearSDKService;
}

export interface SetServiceParams extends BaseSetServiceParams {
    service: NearSDKService;
    serviceIndex: number;
}

export interface CreateServiceInstanceParams extends BaseSetServiceParams {
    privateKey?: string;
    mnemonic?: string;
    nameId?: string;
}

export interface InitServiceInstanceParams extends Omit<SetServicesParams, "services"> {
    mnemonic?: string;
}

export interface CreateInstanceReturn {
    account: string;
    privateKey: string;
}
