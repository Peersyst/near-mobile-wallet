import { BaseStorageService } from "module/common/service/BaseStorageService";
import { NetworkType } from "module/settings/state/SettingsState";
import deleteWallet, {
    deleteWalletFromPrivateKey,
    deleteWalletId,
    findByPrivateKey,
    getWallet as getWalletUtil,
    findByWalletId,
    setWallet,
    updateWalletUncommittedTxHashes,
    orderWallets,
} from "./utils/wallet.utils";
import {
    SecureWalletStorageType,
    UnsecureWalletStorageType,
    StorageWallet,
    SecureWalletInfo,
    UnencryptedWalletInfo,
    SetWalletsParams,
} from "./wallet.types";

export const WalletStorage = new (class extends BaseStorageService<SecureWalletStorageType, UnsecureWalletStorageType> {
    constructor() {
        super("wallet");
    }

    /**
     * STORAGE METHODS
     */
    async getPin(): Promise<Storage["pin"]> {
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

    async getMnemonic(): Promise<Storage["mnemonic"]> {
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

    async setWallets({ network, wallets, secureWallets }: SetWalletsParams): Promise<void> {
        await this.setSecureWallets(secureWallets, network);
        await this.setUnencryptedWallets(wallets, network);
    }

    /**
     * WALLET STORAGE METHODS
     */

    async addWallet(wallet: StorageWallet, network: NetworkType, privateKey: string, index: number): Promise<void> {
        await this.setUnencryptedWallet(wallet, network, index);
        await this.addWalletId(index, privateKey, network);
    }
    async editWallet(index: number, network: NetworkType, info: Partial<Pick<StorageWallet, "colorIndex">>): Promise<void> {
        const wallet = await this.getUnencryptedWallet(index, network);
        if (wallet) {
            await this.setUnencryptedWallet({ ...wallet, ...info }, network, index);
        }
    }
    async removeWallet(index: number, network: NetworkType): Promise<void> {
        await this.removeUnencryptedWallet(index, network);
        await this.deleteWalletId(index, network);
    }

    /**
     * Return all the wallets with their info ordered by index
     */
    async getWallets(network: NetworkType): Promise<StorageWallet[]> {
        return this.getUnencryptedWallets(network);
    }

    /**
     * SECURE WALLETS METHODS
     */
    async getSecureWallets(network: NetworkType): Promise<SecureWalletInfo[]> {
        return (await this.getSecure())?.[network] || [];
    }

    async setSecureWallets(wallets: SecureWalletInfo[], network: NetworkType): Promise<void> {
        const secureStorage = (await this.getSecure()) || { pin: undefined, mnemonic: undefined, testnet: [], mainnet: [] };
        await this.setSecure({ ...secureStorage, [network]: wallets });
    }

    async getWalletByPrivateKey(privateKey: string, network: NetworkType): Promise<SecureWalletInfo | undefined> {
        const wallets = await this.getSecureWallets(network);
        return findByPrivateKey(privateKey, wallets);
    }

    async getWalletsIdsFromPrivateKey(privateKey: string, network: NetworkType): Promise<SecureWalletInfo["walletIds"] | undefined> {
        const walletGroup = await this.getWalletByPrivateKey(privateKey, network);
        return walletGroup?.walletIds;
    }

    async deleteWalletId(walletId: number, network: NetworkType): Promise<void> {
        const wallets = await this.getSecureWallets(network);
        //Find the walletGroup (same privateKey) related to the walletId
        const walletGroup = findByWalletId(walletId, wallets);
        if (walletGroup) {
            const newWalletGroup = deleteWalletId(walletId, walletGroup);
            const tempWalletGroup = deleteWalletFromPrivateKey(walletGroup.privateKey, wallets);
            if (newWalletGroup.walletIds.length === 0) {
                await this.setSecureWallets(tempWalletGroup, network);
            } else {
                await this.setSecureWallets([...tempWalletGroup, newWalletGroup], network);
            }
        }
    }

    async addWalletId(walletId: number, privateKey: string, network: NetworkType): Promise<void> {
        const secureWallets = await this.getSecureWallets(network);
        const walletGroup = findByPrivateKey(privateKey, secureWallets);
        if (walletGroup) {
            await this.setSecureWallets(
                [
                    ...deleteWalletFromPrivateKey(privateKey, secureWallets),
                    { ...walletGroup, walletIds: [...walletGroup.walletIds, walletId] },
                ],
                network,
            );
        } else {
            await this.setSecureWallets([...secureWallets, { privateKey, walletIds: [walletId] }], network);
        }
    }

    /**
     * UNENCRYPTED WALLETS METHODS
     */
    async getUnencryptedWallets(network: NetworkType): Promise<UnencryptedWalletInfo[]> {
        return orderWallets((await this.get())?.[network] || []);
    }

    async setUnencryptedWallets(wallets: UnencryptedWalletInfo[], network: NetworkType): Promise<void> {
        const storage = (await this.get()) || { testnet: [], mainnet: [] };
        await this.set({ ...storage, [network]: wallets });
    }

    async getUnencryptedWallet(index: number, network: NetworkType): Promise<UnencryptedWalletInfo | undefined> {
        const wallets = await this.getUnencryptedWallets(network);
        return getWalletUtil(index, wallets);
    }

    async setUnencryptedWallet(wallet: UnencryptedWalletInfo, network: NetworkType, index?: number): Promise<void> {
        const storage = await this.get();
        const wallets = storage?.[network] || [];
        if (storage && wallets) {
            const newWallets = setWallet(wallets, wallet, index ?? wallets.length);
            await this.set({ ...storage, [network]: newWallets });
        }
    }

    async removeUnencryptedWallet(index: number, network: NetworkType): Promise<void> {
        const wallets = await this.getUnencryptedWallets(network);
        if (wallets) {
            const newWallets = deleteWallet(wallets, index);
            await this.setUnencryptedWallets(newWallets, network);
        }
    }

    async getUncommittedTransactionHashes(
        index: number,
        network: NetworkType,
    ): Promise<UnencryptedWalletInfo["uncommittedTransactionHashes"]> {
        return (await this.getUnencryptedWallet(index, network))?.uncommittedTransactionHashes;
    }

    async updateUncommitedTransactionHashes(index: number, network: NetworkType, hashes: string[]): Promise<void> {
        const storage = await this.get();
        if (!storage) return;
        const wallets = orderWallets(storage[network] || []);
        const newWallets = updateWalletUncommittedTxHashes(wallets, hashes, index);
        return this.set({ ...storage, [network]: newWallets });
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
