import { atom } from "recoil";

export interface WalletState {
    hasWallet: boolean;
    isAuthenticated: boolean;
    name?: string;
}

const walletState = atom<WalletState>({
    key: "wallet",
    default: { hasWallet: false, isAuthenticated: false },
});

export default walletState;
