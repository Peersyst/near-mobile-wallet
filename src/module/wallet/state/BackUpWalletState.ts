import { atom } from "recoil";

export type BackUp = "mnemonic" | "privateKey";

export interface BackUpWalletState {
    method?: BackUp;
    walletIndex?: number;
}

const backupWalletState = atom<BackUpWalletState>({
    key: "backupWallet",
    default: {},
});

export default backupWalletState;
