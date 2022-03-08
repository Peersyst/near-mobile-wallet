import { atom } from "recoil";

export interface Wallet {
    address: string;
    balance: string;
}

export interface WalletState {
    hasWallet: boolean;
    isAuthenticated: boolean;
    name?: string;
    wallets: Wallet[];
}

const walletState = atom<WalletState>({
    key: "wallet",
    default: { hasWallet: false, isAuthenticated: false, wallets: [] },
});

export default walletState;
