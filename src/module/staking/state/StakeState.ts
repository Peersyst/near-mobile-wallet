import { atom } from "recoil";

export interface StakeState {
    amount?: string;
    accountId: string;
}

const stakeState = atom<StakeState>({
    key: "stake",
    default: {
        amount: "",
        accountId: "",
    },
});

export default stakeState;
