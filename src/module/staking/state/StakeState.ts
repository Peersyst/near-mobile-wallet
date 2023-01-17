import { atom } from "recoil";
import { StakingValidator } from "module/staking/hook/useGetStakingValidators";

export interface StakeState {
    validator: StakingValidator;
}

const stakeState = atom<StakingValidator>({
    key: "stake",
    default: {
        accountId: "",
        fee: null,
        status: "active",
    },
});

export default stakeState;
