import { NearSdkMock } from "mocks/NearSdk";
import { Chain } from "module/common/service/CkbSdkService.types";
import { Chains, NearSDKService } from "module/common/service/NearSdkService";
import * as UseGetServiceInstance from "module/wallet/hook/useGetServiceInstance";
import BaseMock from "../base.mock";

export class UseGetServiceInstanceMock extends BaseMock implements UseGetServiceInstance.UseGetServiceInstanceReturn {
    network: Chain;
    serviceInstance: NearSDKService;
    index: number;
    constructor({
        network = Chains.TESTNET,
        serviceInstance = new NearSdkMock().service,
        index = 0,
    }: Partial<UseGetServiceInstance.UseGetServiceInstanceReturn> = {}) {
        super();
        this.network = network;
        this.serviceInstance = serviceInstance;
        this.index = index;
        this.mock = jest.spyOn(UseGetServiceInstance, "default").mockReturnValue(this);
    }
}
