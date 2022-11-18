import BaseMock from "mocks/common/base.mock";
import { AccountBalance } from "near-peersyst-sdk";

export class AccountBalanceMock extends BaseMock implements AccountBalance {
    total: string;
    stateStaked: string;
    staked: string;
    available: string;
    constructor({ total, staked, stateStaked, available }: Partial<AccountBalance> = {}) {
        super();
        this.total = total || "12000";
        this.stateStaked = stateStaked || "2000";
        this.staked = staked || "2000";
        this.available = available || "10000";
    }
}
