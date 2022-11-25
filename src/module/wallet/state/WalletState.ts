import { atom } from "recoil";
import { NearSDKService } from "near-peersyst-sdk";
import { NetworkType } from "module/settings/state/SettingsState";
import { StorageWallet } from "../wallet.types";

export const serviceInstancesMap = new Map<NetworkType, NearSDKService[]>();

export type Wallet = Omit<StorageWallet, "privateKey">;

export interface WalletState {
    hasWallet: boolean;
    isAuthenticated: boolean;
    /**
     * They can be tesnet or mainnet wallets, but only one network type at a time
     * They are setted in useLoad from the information in the storage
     * When the user switch between networks, the wallets must be updated
     */
    wallets: Wallet[];
    selectedWallet?: number;
}

const walletState = atom<WalletState>({
    key: "wallet",
    default: { hasWallet: false, isAuthenticated: false, wallets: [] },
});

export default walletState;
