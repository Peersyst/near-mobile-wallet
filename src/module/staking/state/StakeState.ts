import { atom } from "recoil";

export interface StakeState {
    amount?: string;
}

const stakeState = atom<StakeState>({
    key: "stake",
});

export default stakeState;
