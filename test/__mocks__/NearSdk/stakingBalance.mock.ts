import { StakingBalance } from "module/sdk";
import BaseMock from "mocks/common/base.mock";

export class StakingBalanceMock extends BaseMock {
    staked: string;
    available: string;
    pending: string;
    rewardsEarned?: string;
    constructor({ staked, available, pending, rewardsEarned }: Partial<StakingBalance> = {}) {
        super();
        this.staked = staked?.toString() || "0";
        this.available = available?.toString() || "0";
        this.pending = pending?.toString() || "0";
        this.rewardsEarned = rewardsEarned?.toString() || "0";
    }
}
