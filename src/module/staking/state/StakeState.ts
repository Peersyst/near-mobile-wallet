import { atom } from "recoil";

export interface StakeState {
    amount?: string;
}

const stakeState = atom<StakeState>({
    key: "stake",
    default: {
        amount: "",
    },
});

export default stakeState;
