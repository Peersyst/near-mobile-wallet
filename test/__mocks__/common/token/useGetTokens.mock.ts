import { TokenMock, TokensMock } from "test-mocks";
import BaseMock from "../base.mock";
import { UseServiceInstanceMock } from "../wallet";

export interface UseGetTokensMockType {
    fts: TokenMock[];
}

export class UseGetTokensMock extends BaseMock {
    fts: TokenMock[];
    serviceInstance: UseServiceInstanceMock["serviceInstance"];
    constructor({ fts }: Partial<UseGetTokensMockType> = {}) {
        super();
        const { serviceInstance } = new UseServiceInstanceMock();
        const { tokens: finalTokens } = new TokensMock({ length: 4, tokens: fts });
        this.fts = finalTokens;
        this.serviceInstance = serviceInstance;
        this.mock = jest.spyOn(serviceInstance, "getAccountTokens").mockResolvedValue(this.fts);
    }
}
