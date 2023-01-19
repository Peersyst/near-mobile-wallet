import BaseMock from "../base.mock";

export interface StakeStateMockInterface {
    amount: string;
}

export class StakeStateMock extends BaseMock implements StakeStateMockInterface {
    amount: string;
    constructor({ amount }: Partial<StakeStateMockInterface> = {}) {
        super();
        this.amount = amount || "";
    }
}
