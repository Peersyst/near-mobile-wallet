import { StorageWallet } from "module/wallet/WalletStorage";

export const storageWallet: StorageWallet = {
    index: 0,
    name: "Wallet",
    colorIndex: 0,
    mnemonic: ["Pizza", "Taco", "Fries"],
};

export const createStorageWallet = (values: Partial<StorageWallet>): StorageWallet => ({ ...storageWallet, ...values });
