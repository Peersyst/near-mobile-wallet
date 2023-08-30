import { atom } from "recoil";

export interface SignRequestState {
    signerWalletIndex?: number;
}

const signRequestState = atom<SignRequestState>({
    key: "signRequest",
    default: {},
});

export default signRequestState;
