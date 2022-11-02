import BaseMock from "mocks/common/base.mock";
import { NearSDKService } from "module/common/service/NearSdkService";

interface NearSdkMockType {
    service: NearSDKService;
}

export class BaseNearSkdMock {
    //TODO: add here all the mock fn that are needed
    getTransactions = jest.fn();
    constructor() {}
}

export class NearSdkMock extends BaseMock implements NearSdkMockType {
    service: NearSDKService;
    constructor({} = {}) {
        super();
        this.service = new BaseNearSkdMock() as unknown as NearSDKService;
    }
}
