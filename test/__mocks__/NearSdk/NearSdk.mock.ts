import BaseMock from "mocks/common/base.mock";
import { NearSDKService } from "module/common/service/NearSdkService";

interface NearSdkMockType {
    service: NearSDKService;
}

export const MOCKED_ADDRESS = "0xMockedAddress";

export const BaseNearSkdMock = {
    //TODO: add here all the mock fn that are needed
    getTransactions: jest.fn().mockResolvedValue([]),
    getAddress: jest.fn().mockReturnValue(MOCKED_ADDRESS),
    getCKBBalance: jest.fn(),
    getDAOBalance: jest.fn(),
    getDAOUnlockableAmounts: jest.fn(),
    getNfts: jest.fn(),
    getTokensBalance: jest.fn(),
};

export class NearSdkMock extends BaseMock implements NearSdkMockType {
    service: NearSDKService;
    constructor({} = {}) {
        super();
        this.service = BaseNearSkdMock as unknown as NearSDKService;
    }
}
