import { atom } from "recoil";

export interface WalletState {
    hasWallet: boolean;
    isAuthenticated: boolean;
    name?: string;
    isFirstTime: boolean;
}

const walletState = atom<WalletState>({
    key: "wallet",
    default: { hasWallet: false, isAuthenticated: false, isFirstTime: false },
});

export default walletState;
