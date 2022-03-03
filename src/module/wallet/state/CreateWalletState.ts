import { atom } from "recoil";

export interface CreateWalletState {
    name: string | undefined;
    pin: string | undefined;
    mnemonic: string[] | undefined;
}

const createWalletState = atom<CreateWalletState>({
    key: "createWallet",
    default: {
        name: undefined,
        pin: undefined,
        mnemonic: undefined,
    },
});

export default createWalletState;
