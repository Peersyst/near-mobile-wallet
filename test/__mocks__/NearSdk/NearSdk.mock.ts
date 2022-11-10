import BaseMock, { MockFnType } from "mocks/common/base.mock";
import { NearSDKService } from "module/common/service/NearSdkService";

interface NearSdkServiceMockType {
    getTransactions: MockFnType;
    getAddress: MockFnType;
    getCKBBalance: MockFnType;
    getDAOBalance: MockFnType;
    getDAOUnlockableAmounts: MockFnType;
    getNfts: MockFnType;
    getTokensBalance: MockFnType;
}
interface NearSdkMockType {
    service: NearSDKService;
}

export const MOCKED_ADDRESS = "0xMockedAddress";

export const BaseNearSkdMock = {
    //TODO: add here all the mock fn that are needed
    getTransactions: jest.fn().mockReturnValue([]),
    getAddress: jest.fn().mockReturnValue(MOCKED_ADDRESS),
    getCKBBalance: jest.fn(),
    getDAOBalance: jest.fn(),
    getDAOUnlockableAmounts: jest.fn(),
    getNfts: jest.fn(),
    getTokensBalance: jest.fn(),
};

export class NearSdkMock extends BaseMock implements NearSdkMockType {
    public service: NearSDKService;
    constructor() {
        super();
        this.service = new NearSdkServiceMock() as any as NearSDKService;
    }
}

export class NearSdkServiceMock extends BaseMock implements NearSdkServiceMockType {
    getTransactions: MockFnType;
    getAddress: MockFnType;
    getCKBBalance: MockFnType;
    getDAOBalance: MockFnType;
    getDAOUnlockableAmounts: MockFnType;
    getNfts: MockFnType;
    getTokensBalance: MockFnType;

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
