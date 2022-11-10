import BaseMock, { MockFnType } from "mocks/common/base.mock";

interface NearSdkServiceMockType {
    getTransactions: MockFnType;
    getAddress: MockFnType;
    getCKBBalance: MockFnType;
    getDAOBalance: MockFnType;
    getDAOUnlockableAmounts: MockFnType;
    getNfts: MockFnType;
    getTokensBalance: MockFnType;
}

export const MOCKED_ADDRESS = "0xMockedAddress";

export class NearSdkServiceMock extends BaseMock implements NearSdkServiceMockType {
    getTransactions: MockFnType;
    getAddress: MockFnType;
    getCKBBalance: MockFnType;
    getDAOBalance: MockFnType;
    getDAOUnlockableAmounts: MockFnType;
    getNfts: MockFnType;
    getTokensBalance: MockFnType;
    //TODO: add here all the mock fn that are needed

    constructor() {
        super();
        this.getTransactions = jest.fn().mockReturnValue([]);
        this.getAddress = jest.fn().mockReturnValue(MOCKED_ADDRESS);
        this.getCKBBalance = jest.fn();
        this.getDAOBalance = jest.fn();
        this.getDAOUnlockableAmounts = jest.fn();
        this.getNfts = jest.fn();
        this.getTokensBalance = jest.fn();
    }
}
