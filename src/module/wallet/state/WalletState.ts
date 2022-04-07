import { atom } from "recoil";
import { StorageWallet } from "module/wallet/WalletStorage";
import { CKBSDKService } from "module/common/service/CkbSdkService";

export interface Wallet extends Omit<StorageWallet, "mnemonic"> {
    serviceInstance?: CKBSDKService;
}

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
