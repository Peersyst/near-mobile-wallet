import BaseMock, { MockFnType } from "mocks/common/base.mock";
import { AccountBalanceMock } from "./accountBalance.mock";
import { TokensMock } from "./token.mock";

interface NearSdkServiceMockType {
    getTransactions: MockFnType;
    getAddress: MockFnType;
    getNfts: MockFnType;
    getAccountTokens: MockFnType;
}

export const MOCKED_ADDRESS = "0xMockedAddress";
export const MOCKED_NAMED_ADDRESS = "peersyst.near";

export class NearSdkServiceMock extends BaseMock implements NearSdkServiceMockType {
    getTransactions: MockFnType;
    getAddress: MockFnType;
    getNfts: MockFnType;
    getAccountTokens: MockFnType;
    getAccountBalance: MockFnType;
    //TODO: add here all the mock fn that are needed

    constructor() {
        super();
        this.getTransactions = jest.fn().mockReturnValue([]);
        this.getAddress = jest.fn().mockReturnValue(MOCKED_ADDRESS);
        this.getNfts = jest.fn();
        this.getAccountTokens = jest.fn().mockResolvedValue(new TokensMock());
        this.getAccountBalance = jest.fn().mockResolvedValue(new AccountBalanceMock());
    }
}
