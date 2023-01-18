import { UseMutateFunction } from "react-query";
import { atom } from "recoil";
import { StakingValidator } from "../hook/useGetStakingValidators";
import { UseAddStakeParams } from "../query/useAddStake";

export interface StakeState {
    validator: StakingValidator;
    amount: string;
    sendTransaction: () => undefined;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    onExited: () => void;
    labelConfirm: string;
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
        sendTransaction: () => undefined,
        isLoading: false,
        isError: false,
        isSuccess: false,
        onExited: () => undefined,
        labelConfirm: "",
    },
});

export default stakeState;
