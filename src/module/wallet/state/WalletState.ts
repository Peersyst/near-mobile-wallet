import { atom } from "recoil";
import { StorageWallet } from "module/wallet/WalletStorage";
import { NearSDKService } from "near-peersyst-sdk";
import { NetworkType } from "module/settings/state/SettingsState";

export const serviceInstancesMap = new Map<NetworkType, NearSDKService[]>();

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
