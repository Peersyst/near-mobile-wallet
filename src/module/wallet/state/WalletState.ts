import { atom } from "recoil";
import { StorageWallet } from "module/wallet/WalletStorage";
import { NearSDKService } from "near-peersyst-sdk";

export const serviceInstancesMap = new Map<number, { testnet: NearSDKService; mainnet: NearSDKService }>();

export type Wallet = Omit<StorageWallet, "mnemonic">;

export interface WalletState {
    hasWallet: boolean;
    isAuthenticated: boolean;
    wallets: Wallet[];
    selectedWallet?: number;
}

const walletState = atom<WalletState>({
    key: "wallet",
    default: { hasWallet: false, isAuthenticated: false, wallets: [] },
});

export default walletState;
