import { atom } from "recoil";
import { Validator } from "near-peersyst-sdk";

export interface StakeState {
    validator: Validator;
    amount: string;
}

const stakeState = atom<StakeState>({
    key: "stake",
    default: {
        validator: {
            accountId: "",
            fee: null,
            active: false,
        },
        amount: "",
    },
});

export default stakeState;
