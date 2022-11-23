import { atom } from "recoil";
import { StorageWallet } from "module/wallet/WalletStorage";
import { NearSDKService } from "near-peersyst-sdk";

export const serviceInstancesMap = new Map<number, { testnet: NearSDKService; mainnet: NearSDKService }>();

export type Wallet = Omit<StorageWallet, "mnemonic"> & { synchronizing?: boolean };

export interface WalletState {
    hasWallet: boolean;
    isAuthenticated: boolean;
    wallets: Wallet[];
    isFirstTime: boolean;
    selectedWallet?: number;
}

const walletState = atom<WalletState>({
    key: "wallet",
    default: { hasWallet: false, isAuthenticated: false, isFirstTime: false, wallets: [] },
});

export default walletState;
