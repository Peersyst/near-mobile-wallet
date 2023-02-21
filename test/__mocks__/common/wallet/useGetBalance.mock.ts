import { AccountBalanceMock } from "test-mocks";
import BaseMock from "../base.mock";
import { UseServiceInstanceMock } from "../wallet";

export interface UseGetBalanceMockType {
    balance: AccountBalanceMock;
}

export class UseGetBalanceMock extends BaseMock {
    balance: AccountBalanceMock;
    constructor({ balance }: Partial<UseGetBalanceMockType> = {}) {
        super();
        const { serviceInstance } = new UseServiceInstanceMock();
        const accountBalance = balance || new AccountBalanceMock();
        this.balance = accountBalance;
        this.mock = jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);
    }
}
