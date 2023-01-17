import { atom } from "recoil";
import { StakingValidator } from "module/staking/hook/useGetStakingValidators";

export interface StakeState {
    validator: StakingValidator;
    amount: string;
}

const stakeState = atom<StakeState>({
    key: "stake",
    default: {
        validator: {
            accountId: "",
            fee: null,
            status: "active",
        },
        amount: "",
    },
});

export default stakeState;
