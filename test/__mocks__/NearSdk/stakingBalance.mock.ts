import { StakingBalance } from "module/sdk";
import BaseMock from "mocks/common/base.mock";

export class StakingBalanceMock extends BaseMock implements StakingBalance {
    staked: number;
    available: number;
    pending: number;
    rewardsEarned?: number;
    constructor({ staked, available, pending, rewardsEarned }: Partial<StakingBalance> = {}) {
        super();
        this.staked = staked || 0;
        this.available = available || 0;
        this.pending = pending || 0;
        this.rewardsEarned = rewardsEarned;
    }
}
