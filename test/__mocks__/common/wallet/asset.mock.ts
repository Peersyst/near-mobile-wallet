import { NftTokenMock, TokenMock } from "mocks/NearSdk";
import { AssetType } from "module/wallet/wallet.types";
import BaseMock from "../base.mock";

export interface AssetMockInterface {
    type: AssetType;
    nft?: NftTokenMock;
    ft?: TokenMock;
}

export class AssetMock extends BaseMock implements AssetMockInterface {
    type: AssetType;
    nft?: NftTokenMock;
    ft?: TokenMock;
    constructor({ type, nft, ft }: Partial<AssetMockInterface> = {}) {
        super();
        this.type = type || AssetType.TOKEN;
        this.nft = nft;
        this.ft = ft;
    }
}
