import { atom } from "recoil";

export interface Account {
    address: string;
    balance: string;
}

export interface WalletState {
    hasWallet: boolean;
    isAuthenticated: boolean;
    name?: string;
    isFirstTime: boolean;
    accounts: Account[];
}

const walletState = atom<WalletState>({
    key: "wallet",
    default: { hasWallet: false, isAuthenticated: false, isFirstTime: false, accounts: [] },
});

export default walletState;
