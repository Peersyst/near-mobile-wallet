import { StakingBalance } from "module/sdk";
import BaseMock from "mocks/common/base.mock";

export class StakingBalanceMock extends BaseMock implements StakingBalance {
    staked: string;
    available: string;
    pending: string;
    rewardsEarned?: string;
    constructor({ staked, available, pending, rewardsEarned }: Partial<StakingBalance> = {}) {
        super();
        this.staked = staked || "0";
        this.available = available || "0";
        this.pending = pending || "0";
        this.rewardsEarned = rewardsEarned || "0";
    }
}
