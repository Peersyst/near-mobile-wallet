import { Validator } from "near-peersyst-sdk";
import { atom } from "recoil";

export interface StakeState {
    validator: Validator;
}

const stakeState = atom<Validator>({
    key: "stake",
    default: {
        accountId: "",
        fee: null,
    },
});

export default stakeState;
