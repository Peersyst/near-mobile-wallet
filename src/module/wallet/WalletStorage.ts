import { BaseStorageService } from "module/common/service/BaseStorageService";
import { NetworkType } from "module/settings/state/SettingsState";
import updateWalletUncommitedTxHashes from "./utils/updateWalletUncommittedTxHashes";

export interface UnencryptedWalletInfo {
    index: number;
    uncommittedTransactionHashes?: string[];
    imported?: boolean;
    colorIndex: number;
    account: string;
}

export interface SecureWalletInfo {
    index: number;
    /**
     * This mnemonic is used to import the wallet with a mnemonic once the user has already a mnemonic
     */
    mnemonic?: string[];
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

export type WalletInfoStorage = SecureWalletStorageType & SecureWalletInfo & Omit<UnencryptedWalletInfo, "index">;

export type StorageWallet = {
    pin: SecureWalletStorageType["pin"];
    mnemonic: SecureWalletStorageType["mnemonic"];
    testnet: WalletInfoStorage[];
    mainnet: WalletInfoStorage[];
};

export const WalletStorage = new (class extends BaseStorageService<SecureWalletStorageType, UnsecureWalletStorageType> {
    constructor() {
        super("wallet");
    }

    /**
     * STORAGE METHODS
     */
    async getPin(): Promise<StorageWallet["pin"]> {
        const secureStorage = await this.getSecure();
        return secureStorage?.pin;
    }

    async setPin(pin: string): Promise<void> {
        const secureStorage = await this.getSecure();
        if (secureStorage) {
            return this.setSecure({ ...secureStorage, pin });
        } else {
            console.warn("You should not set a pin if you don't have a mnemonic");
            return;
        }
    }

    async getMnemonic(): Promise<StorageWallet["mnemonic"]> {
        return (await this.getSecure())?.mnemonic;
    }

    async setMnemonic(mnemonic: string): Promise<void> {
        const secureStorage = await this.getSecure();
        if (secureStorage) {
            return this.setSecure({ ...secureStorage, mnemonic });
        } else {
            console.warn("You should not set a mnemonic if you don't have a pin");
            return;
        }
    }

    async setWallets(wallets: WalletStorage[], network: NetworkType): Promise<void> {
        const walletsSecureInfo: SecureWalletInfo[] = [];
        const walletsUnencryptedInfo: UnencryptedWalletInfo[] = [];
        const secureStorage = (await this.getSecure()) || { pin: undefined };
        const storage = await this.get();
        await this.setSecure({ ...secureStorage, wallets: walletsSecureInfo });
        await this.set({ ...storage, wallets: walletsUnencryptedInfo });
    }

    async addWallet(wallet: Omit<StorageWallet, "index">): Promise<StorageWallet | undefined> {
        const wallets = await this.getWallets();
        if (!wallets) return undefined;
        const newWallet = { ...wallet, index: wallets.length };
        await this.setWallets([...wallets, newWallet]);
        return newWallet;
    }

    async editWallet(index: number, { name, colorIndex }: Pick<StorageWallet, "name" | "colorIndex">): Promise<void> {
        const wallets = await this.getWallets();
        if (wallets) {
            await this.setWallets(wallets.map((wallet) => (wallet.index === index ? { ...wallet, name, colorIndex } : wallet)));
        }
    }

    async removeWallet(index: number): Promise<void> {
        const wallets = await this.getWallets();
        if (wallets) {
            await this.setWallets(
                wallets
                    .filter((wallet) => wallet.index !== index)
                    .map((wallet) => (wallet.index > index ? { ...wallet, index: wallet.index - 1 } : wallet)),
            );
        }
    }

    async getWallets(): Promise<StorageWallet[] | undefined> {
        const secureStorage = await this.getSecure();
        if (!secureStorage) return undefined;
        const storage = await this.get();
        const wallets: StorageWallet[] = [];
        for (let i = 0; i < secureStorage.wallets.length; i++) {
            const walletSecureInfo = secureStorage.wallets.find((w) => w.index === i);
            if (walletSecureInfo) {
                const walletUnencryptedInfo = storage?.wallets.find((w) => w.index === i) || { index: i, colorIndex: 0 };
                wallets.push({ ...walletSecureInfo, ...walletUnencryptedInfo });
            }
        }
        return wallets.sort((a, b) => a.index - b.index);
    }

    async getWallet(index: number): Promise<StorageWallet | undefined> {
        const secureStorage = await this.getSecure();
        const walletSecureInfo = secureStorage?.wallets.find((w) => w.index === index);
        if (!walletSecureInfo) return undefined;
        const storage = await this.get();
        const walletUnencryptedInfo = storage?.wallets.find((w) => w.index === index) || { index: index, colorIndex: 0 };
        return { ...walletSecureInfo, ...walletUnencryptedInfo };
    }

    /**
     * SECURE WALLETS METHODS
     */
    async getSecureWallet(index: number, network: NetworkType): Promise<SecureWalletInfo | undefined> {
        return (await this.getSecure())?.[network][index];
    }

    async getWalletMnemonic(index: number, network: NetworkType): Promise<SecureWalletInfo["mnemonic"]> {
        return (await this.getSecureWallet(index, network))?.mnemonic;
    }

    async getWalletPrivateKey(index: number, network: NetworkType): Promise<SecureWalletInfo["privateKey"] | undefined> {
        return (await this.getSecureWallet(index, network))?.privateKey;
    }

    /**
     * UNENCRYPTED WALLETS METHODS
     */
    async getUnEncrypedWallets(network: NetworkType): Promise<UnencryptedWalletInfo[]> {
        return (await this.get())?.[network] || [];
    }
    async getUnencryptedWallet(index: number, network: NetworkType): Promise<UnencryptedWalletInfo | undefined> {
        return (await this.getUnEncrypedWallets(network))[index];
    }
    async getAccount(index: number, network: NetworkType): Promise<UnencryptedWalletInfo["account"] | undefined> {
        return (await this.getUnencryptedWallet(index, network))?.account;
    }

    async getColorIndex(index: number, network: NetworkType): Promise<UnencryptedWalletInfo["colorIndex"] | undefined> {
        return (await this.getUnencryptedWallet(index, network))?.colorIndex;
    }

    async getUncommittedTransactionHashes(
        index: number,
        network: NetworkType,
    ): Promise<UnencryptedWalletInfo["uncommittedTransactionHashes"]> {
        return (await this.getUnencryptedWallet(index, network))?.uncommittedTransactionHashes;
    }

    async updateUncommitedTransactionHashes(index: number, network: NetworkType, hashes: string[]): Promise<void> {
        const wallets = await this.getUnEncrypedWallets(network);
        const storage = await this.get();
        if (!wallets || !storage) return;
        const updatedWallets = updateWalletUncommitedTxHashes(wallets, index, network, hashes);
        return this.set({ ...storage, [network]: updatedWallets });
    }

    async addUncommittedTransactionHash(index: number, network: NetworkType, hash: string): Promise<void> {
        const storage = await this.get();
        if (!storage) return;
        const uncommittedTransactionHashes = (await this.getUncommittedTransactionHashes(index, network)) || [];
        return this.updateUncommitedTransactionHashes(index, network, [...uncommittedTransactionHashes, hash]);
    }

    async removeUncommittedTransactionHash(index: number, chain: NetworkType, hash: string): Promise<void> {
        const storage = await this.get();
        if (!storage) return;
        const uncommittedTransactionHashes = (await this.getUncommittedTransactionHashes(index, chain)) || [];
        const finalUncommittedTransactionHashes = uncommittedTransactionHashes.filter((h) => h !== hash);
        return this.updateUncommitedTransactionHashes(index, chain, finalUncommittedTransactionHashes);
    }
})();
