import { atom } from "recoil";

/**
 * This state is only used in the createWallet process
 * to access the general wallet info use WalletState
 */

export interface CreateWalletState {
    name: string | undefined;
    pin: string | undefined;
    mnemonic: string[] | undefined;
    privateKey?: string | undefined;
    colorIndex: number | undefined;
}

const createWalletState = atom<CreateWalletState>({
    key: "createWallet",
    default: {
        name: undefined,
        pin: undefined,
        privateKey: undefined,
        mnemonic: undefined,
        colorIndex: undefined,
    },
});

export default createWalletState;
