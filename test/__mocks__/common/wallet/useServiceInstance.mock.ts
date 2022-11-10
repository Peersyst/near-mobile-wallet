import { NearSdkMock } from "mocks/NearSdk";
import { Chain } from "module/common/service/CkbSdkService.types";
import { Chains, NearSDKService } from "module/common/service/NearSdkService";
import * as useServiceInstance from "module/wallet/hook/useServiceInstance";
import BaseMock from "../base.mock";

export class UseServiceInstanceMock extends BaseMock implements useServiceInstance.useServiceInstanceReturn {
    network: Chain;
    serviceInstance: NearSDKService;
    index: number;
    constructor({
        network = Chains.TESTNET,
        serviceInstance = new NearSdkMock().service,
        index = 0,
    }: Partial<useServiceInstance.useServiceInstanceReturn> = {}) {
        super();
        this.network = network;
        this.serviceInstance = serviceInstance;
        this.index = index;
        this.mock = jest.spyOn(useServiceInstance, "default").mockReturnValue(this);
    }
}
