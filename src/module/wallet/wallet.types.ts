export interface BaseStorageWallet {
    index: number;
}

export interface UnencryptedWalletInfo extends BaseStorageWallet {
    uncommittedTransactionHashes?: string[];
    imported?: boolean;
    colorIndex: number;
    account: string;
}

export interface SecureWalletInfo extends BaseStorageWallet {
    privateKey: string;
}

export interface SecureWalletStorageType {
    testnet: SecureWalletInfo[];
    mainnet: SecureWalletInfo[];
    pin: string | undefined;
    mnemonic: string | undefined;
}

export interface UnsecureWalletStorageType {
    testnet: UnencryptedWalletInfo[];
    mainnet: UnencryptedWalletInfo[];
}

export type StorageWallet = SecureWalletInfo & Omit<UnencryptedWalletInfo, "index">;

export type StorageWithoutPrivateKey = Omit<StorageWallet, "privateKey">;

export type WalletStorageType = {
    pin: SecureWalletStorageType["pin"];
    mnemonic: SecureWalletStorageType["mnemonic"];
    testnet: StorageWallet[];
    mainnet: StorageWallet[];
};

export type UpdatableWallet = Pick<UnencryptedWalletInfo, "colorIndex" | "index">;
