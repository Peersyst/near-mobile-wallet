import { NearSdkServiceMock } from "mocks/NearSdk";
import { Chains, NearSDKService } from "near-peersyst-sdk";
import { NetworkType } from "module/settings/state/SettingsState";
import * as useServiceInstance from "module/wallet/hook/useServiceInstance";
import BaseMock from "../base.mock";

export class UseServiceInstanceMock extends BaseMock implements useServiceInstance.useServiceInstanceReturn {
    network: NetworkType;
    serviceInstance: NearSDKService;
    index: number;
    queryEnabled: boolean;
    constructor({
        network = Chains.TESTNET,
        serviceInstance = new NearSdkServiceMock() as any as NearSDKService, //Delete this any as soon as the NearSdkServiceMock is finished
        index = 0,
        queryEnabled = true,
    }: Partial<useServiceInstance.useServiceInstanceReturn> = {}) {
        super();
        this.network = network;
        this.serviceInstance = serviceInstance;
        this.index = index;
        this.queryEnabled = queryEnabled;

        this.mock = jest.spyOn(useServiceInstance, "default").mockReturnValue(this);
    }
}
