import { atom } from "recoil";
import { cells } from "../mock/cells";

export interface Cell {
    address: string;
    balance: string;
}

export interface WalletState {
    hasWallet: boolean;
    isAuthenticated: boolean;
    name?: string;
    cells: Cell[];
}

const walletState = atom<WalletState>({
    key: "wallet",
    default: { hasWallet: false, isAuthenticated: false, cells: cells },
});

export default walletState;
