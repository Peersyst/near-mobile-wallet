import * as UseGetAllAssets from "module/wallet/query/useGetAllAssets";
import { AccountBalanceMock, NftTokenMock, NftTokensMock, TokenMock, TokensMock } from "test-mocks";
import BaseMock from "../base.mock";

export interface UseGetAllAssetsMockInterface {
    isLoading: boolean;
    tokens: TokenMock[];
    nfts: NftTokenMock[];
    balance: AccountBalanceMock;
}

export class UseGetAllAssetsMock extends BaseMock implements UseGetAllAssetsMockInterface {
    isLoading: boolean;
    tokens: TokenMock[];
    nfts: NftTokenMock[];
    balance: AccountBalanceMock;

    constructor({ isLoading, tokens, nfts, balance }: Partial<UseGetAllAssetsMockInterface> = {}) {
        super();
        this.isLoading = isLoading || false;
        this.tokens = tokens || new TokensMock({ length: 2 }).tokens;
        this.nfts = nfts || new NftTokensMock({ length: 2 }).nfts;
        this.balance = balance || new AccountBalanceMock();
        this.mock = jest.spyOn(UseGetAllAssets, "useGetAllAssets").mockReturnValue(this);
    }
}
