import { atom } from "recoil";

/**
 * This state is only used in the createWallet process
 * to access the general wallet info use WalletState
 */

export interface CreateWalletState {
    name: string | undefined;
    pin?: string | undefined;
    mnemonic?: string[] | undefined;
    privateKey?: string | undefined; //Only used for import with privateKey (has other previous accounts)
    importWithPrivateKey?: boolean;
}

const createWalletState = atom<CreateWalletState>({
    key: "createWallet",
    default: {
        name: undefined,
        pin: undefined,
        privateKey: undefined,
        mnemonic: undefined,
        importWithPrivateKey: false,
    },
});

export default createWalletState;
