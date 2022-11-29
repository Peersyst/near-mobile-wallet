import { NetworkType } from "module/settings/state/SettingsState";

export interface BaseWallet {
    index: number;
}

/**
 * STORAGE TYPES
 */
export interface UnencryptedWalletInfo extends BaseWallet {
    uncommittedTransactionHashes?: string[];
    imported?: boolean;
    colorIndex: number;
    account: string;
}

export interface UnsecureWalletStorageType {
    testnet: [];
    mainnet: UnencryptedWalletInfo[];
}

export interface SecureWalletInfo {
    privateKey: string;
    walletIds: number[];
}

export interface SecureWalletStorageType {
    testnet: SecureWalletInfo[];
    mainnet: SecureWalletInfo[];
    pin: string | undefined;
    mnemonic: string | undefined;
}

export type StorageWallet = UnencryptedWalletInfo;

export interface WalletStorageType {
    pin: SecureWalletStorageType["pin"];
    mnemonic: SecureWalletStorageType["mnemonic"];
    testnet: StorageWallet[];
    mainnet: StorageWallet[];
}

export interface SetWalletsParams {
    wallets: StorageWallet[];
    secureWallets: SecureWalletInfo[];
    network: NetworkType;
}

export type UpdatableWallet = Pick<UnencryptedWalletInfo, "colorIndex" | "index">;
