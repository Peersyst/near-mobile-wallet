import { atom } from "recoil";
import { StakingValidator } from "../hook/useGetStakingValidators";

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
            status: "inactive",
        },
        amount: "",
    },
});

export default stakeState;
