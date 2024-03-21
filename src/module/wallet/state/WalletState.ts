import { atom } from "recoil";
import { StorageWallet } from "../wallet.types";

export type Wallet = StorageWallet & {
    colorIndex: number;
    imported?: boolean;
};

export interface WalletState {
    loading: boolean;
    hasWallet: boolean;
    isAuthenticated: boolean;
    /**
     * They can be tesnet or mainnet wallets, but only one network type at a time
     * They are setted in useLoad from the information in the storage
     * When the user switch between networks, the wallets must be updated
     */
    wallets: Wallet[];
    selectedWallet: number;
    isBackupDone?: boolean;
}

const walletState = atom<WalletState>({
    key: "wallet",
    default: { loading: false, hasWallet: false, isAuthenticated: false, wallets: [], selectedWallet: 0, isBackupDone: undefined },
});

export default walletState;
