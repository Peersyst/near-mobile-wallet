import { NetworkType } from "module/settings/state/SettingsState";
import { NearSDKService } from "near-peersyst-sdk";

export interface BaseNearSdkParams {
    nodeUrl: string;
    indexerUrl: string;
}

export interface BaseSetServiceInstancesParams {
    network: NetworkType;
}

export interface SetServicesParams extends BaseSetServiceInstancesParams {
    services: NearSDKService[];
}

export interface AddServiceParams extends BaseSetServiceInstancesParams {
    service: NearSDKService;
}

export interface SetServiceParams extends BaseSetServiceInstancesParams {
    service: NearSDKService;
    serviceIndex: number;
}

export interface CreateServiceInstancesParams extends BaseSetServiceInstancesParams {
    privateKey?: string;
    mnemonic?: string;
    nameId?: string;
}

export interface InitServiceInstancesParams extends Omit<SetServicesParams, "services"> {
    mnemonic?: string;
}

export interface CreateInstanceReturn {
    account: string;
    privateKey: string;
}

export interface RecoverInstancesReturn extends CreateInstanceReturn {
    service: NearSDKService;
}
