import BaseMock, { MockFnType } from "mocks/common/base.mock";
import { NearSDKService } from "near-peersyst-sdk";
import { AccountBalanceMock } from "./accountBalance.mock";
import { TokensMock } from "./token.mock";
import { StakingBalanceMock } from "mocks/NearSdk/stakingBalance.mock";
import { ValidatorMock } from "mocks/NearSdk/validator.mock";

interface NearSdkServiceMockType {
    getTransactions: MockFnType;
    getAddress: MockFnType;
    getNfts: MockFnType;
    getAccountTokens: MockFnType;
    isAccountConnected: MockFnType;
}

export const MOCKED_ADDRESS = "3493c5193e78d5723246f9d109af668ba8b17d2128358a5dd0c4e777c1c5e6ee";
export const MOCKED_NAMED_ADDRESS = "nearmobiletest.near";
export const MOCKED_PK = "ed25519:5Esk1YZbtUCzptJeWWWC1BraF8UVrkDuiRLftQswAza2n3zctfCBEQ8vwBWcpvnmusxYH7svskm9HenEzuwrHD7h";
export const MOCKED_SECOND_PRIVATE_KEY = "ed25519:s8Qn9KRW6xsK5B5sHJJeAuSEGmcJzJBzWhVCTUzo1JsTtSG2yidgc9oBUcofLyyXuUunBpECcDSNmdxpCUsQW1q";
export const MOCKED_THIRD_PRIVATE_KEY = "ed25519:43r2aKMpatzbAYvgm67m49sYgXAZ9fLKLXRqC9gCsyzVPVGfbZ1nVqVgsZgBwqQLzzGvv132fCzUocNGPK638DpA";

export class NearSdkServiceMock extends BaseMock implements NearSdkServiceMockType {
    getTransactions: MockFnType;
    getAddress: MockFnType;
    getNfts: MockFnType;
    getAccountTokens: MockFnType;
    getAccountBalance: MockFnType;
    nameIsChoosalbe: MockFnType;
    createNewAccountWithSameSecretKey: MockFnType;
    getRecentActivity: MockFnType;
    getTotalStakingBalance: MockFnType;
    getCurrentValidators: MockFnType;
    getAllValidators: MockFnType;
    getSecretKey: MockFnType;
    nameIsValidSubAccount: MockFnType;
    acccountIsValidReceivingAccount: MockFnType;
    isAccountConnected: MockFnType;
    //TODO: add here all the mock fn that are needed

    constructor() {
        super();
        this.getTransactions = jest.fn().mockReturnValue([]);
        this.getAddress = jest.fn().mockReturnValue(MOCKED_ADDRESS);
        this.getNfts = jest.fn();
        this.getAccountTokens = jest.fn().mockResolvedValue(new TokensMock());
        this.getAccountBalance = jest.fn().mockResolvedValue(new AccountBalanceMock());
        this.nameIsChoosalbe = jest.fn().mockResolvedValue(true);
        this.getRecentActivity = jest.fn().mockResolvedValue([]);
        this.createNewAccountWithSameSecretKey = jest.fn().mockResolvedValue(this as any as NearSDKService);
        this.getTotalStakingBalance = jest.fn().mockResolvedValue(new StakingBalanceMock());
        this.getCurrentValidators = jest.fn().mockResolvedValue([new ValidatorMock()]);
        this.getAllValidators = jest.fn().mockResolvedValue([new ValidatorMock()]);
        this.getSecretKey = jest.fn().mockReturnValue(MOCKED_PK);
        this.nameIsValidSubAccount = jest.fn().mockReturnValue(true);
        this.acccountIsValidReceivingAccount = jest.fn().mockResolvedValue(true);
        this.isAccountConnected = jest.fn().mockResolvedValue(true);
    }
}
