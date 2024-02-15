import { atom } from "recoil";
import { StorageWallet } from "../wallet.types";

export type Wallet = StorageWallet & {
    colorIndex: number;
    imported?: boolean;
};

export interface WalletState {
    hasWallet: boolean;
    /**
     * They can be tesnet or mainnet wallets, but only one network type at a time
     * They are setted in useLoad from the information in the storage
     * When the user switch between networks, the wallets must be updated
     */
    wallets: Wallet[];
    selectedWallet: number;
}

const walletState = atom<WalletState>({
    key: "wallet",
    default: { hasWallet: false, wallets: [], selectedWallet: 0 },
});

export default walletState;
