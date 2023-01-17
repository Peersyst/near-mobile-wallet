import { NftTokenMock, NftTokensMock } from "test-mocks";
import BaseMock from "../base.mock";
import { UseServiceInstanceMock } from "../wallet";

export interface UseGetNftsMockType {
    nfts: NftTokenMock[];
}

export class UseGetNftsMock extends BaseMock {
    nfts: NftTokenMock[];
    constructor({ nfts }: Partial<UseGetNftsMockType> = {}) {
        super();
        const { serviceInstance } = new UseServiceInstanceMock();
        const { nfts: finalNfts } = new NftTokensMock({ length: 4, nfts });
        this.nfts = finalNfts;
        this.mock = jest.spyOn(serviceInstance, "getNfts").mockResolvedValue(this.nfts);
    }
}
