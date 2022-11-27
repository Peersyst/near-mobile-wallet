import { Loosen } from "@peersyst/react-types";
import { BaseStorageService } from "module/common/service/BaseStorageService";
import { NetworkType } from "module/settings/state/SettingsState";
import deleteWallet, { getWallet as getWalletUtil, orderWallets, setWallet, updateWalletUncommittedTxHashes } from "./utils/wallet.utils";
import {
    SecureWalletStorageType,
    UnsecureWalletStorageType,
    StorageWallet,
    SecureWalletInfo,
    UnencryptedWalletInfo,
    WalletStorageType,
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

    async setWalletStorage({ pin, mainnet = [], testnet = [], mnemonic }: Loosen<Loosen<WalletStorageType, "mainnet">, "testnet">) {
        const unencryptedStorage = (await this.get()) || {};
        const { secretWallets: secretMainnetWallets, unencryptedWallets: unencryptedMainnetWallets } = this.separateWallets(mainnet);
        const { secretWallets: secretTestnetWallets, unencryptedWallets: unencryptedTestnetWallets } = this.separateWallets(testnet);
        await this.setSecure({ pin, mainnet: secretMainnetWallets, mnemonic, testnet: secretTestnetWallets });
        await this.set({ ...unencryptedStorage, mainnet: unencryptedMainnetWallets, testnet: unencryptedTestnetWallets });
    }

    /**
     * WALLET STORAGE METHODS
     */
    async getWallets(network: NetworkType): Promise<StorageWallet[] | undefined> {
        const secureStorage = await this.getSecure();
        const storage = await this.get();
        if (!secureStorage) return undefined;
        const wallets: StorageWallet[] = [];
        const secureWallets = secureStorage[network];
        const walletsUnencryptedInfo = storage?.[network] || [];
        for (let i = 0; i < secureWallets.length; i++) {
            const walletSecureInfo = getWalletUtil(i, secureWallets);
            const walletUnencryptedInfo = getWalletUtil(i, walletsUnencryptedInfo);
            if (walletSecureInfo && walletUnencryptedInfo) {
                wallets.push({ ...walletSecureInfo, ...walletUnencryptedInfo });
            } else if (walletSecureInfo) {
                console.warn(
                    "Corrupted Wallet. Wallet with a privateKey but without unencrypted info. Wallet secure index:",
                    walletSecureInfo.index,
                );
            }
        }
        return orderWallets(wallets);
    }

    async getWallet(index: number, network: NetworkType): Promise<StorageWallet | undefined> {
        const secureWallet = await this.getSecureWallet(index, network);
        if (!secureWallet) return undefined;
        const walletUnencryptedInfo = await this.getUnencryptedWallet(index, network);
        if (!walletUnencryptedInfo) {
            console.warn(
                "Corrupted Wallet. Wallet with a privateKey but without unencrypted info. Wallet secure index:",
                secureWallet.index,
            );
            return undefined;
        }
        return { ...secureWallet, ...walletUnencryptedInfo };
    }

    public separateWallet({ privateKey, index, ...rest }: StorageWallet) {
        return {
            secureWallet: { privateKey, index },
            unencryptedWallet: { index, ...rest },
        };
    }

    public separateWallets(wallets: StorageWallet[]) {
        const secretWallets: SecureWalletInfo[] = [];
        const unencryptedWallets: UnencryptedWalletInfo[] = [];
        wallets.forEach(({ privateKey, index, ...rest }) => {
            secretWallets.push({ index, privateKey });
            unencryptedWallets.push({ index, ...rest });
        });
        return {
            secretWallets,
            unencryptedWallets,
        };
    }

    async setWallets(wallets: StorageWallet[], network: NetworkType): Promise<void> {
        const secureStorage = (await this.getSecure()) || { pin: undefined, mnemonic: undefined, testnet: [], mainnet: [] };
        const storage = (await this.get()) || { testnet: [], mainnet: [] };
        const { secretWallets, unencryptedWallets } = this.separateWallets(wallets);
        await this.setSecure({
            ...secureStorage,
            [network]: secretWallets,
        });
        await this.set({ ...storage, [network]: unencryptedWallets });
    }

    async addWallet(wallet: Omit<StorageWallet, "index">, network: NetworkType): Promise<StorageWallet | undefined> {
        const wallets = await this.getWallets(network);
        if (!wallets) return undefined;
        const newWallet = { ...wallet, index: wallets.length };
        await this.setWallets([...wallets, newWallet], network);
        return newWallet;
    }

    async editWallet(index: number, network: NetworkType, info: Partial<Pick<StorageWallet, "colorIndex">>): Promise<void> {
        const wallet = await this.getUnencryptedWallet(index, network);
        if (wallet) {
            await this.setUnencryptedWallet({ ...wallet, ...info }, network, index);
        }
    }

    async removeWallet(index: number, network: NetworkType): Promise<void> {
        const wallets = await this.getWallets(network);
        if (wallets) {
            const newWallets = deleteWallet(wallets, index);
            await this.setWallets(newWallets, network);
        }
    }

    /**
     * SECURE WALLETS METHODS
     */
    async getSecureWallets(network: NetworkType): Promise<SecureWalletInfo[] | undefined> {
        return (await this.getSecure())?.[network];
    }

    async getSecureWallet(index: number, network: NetworkType): Promise<SecureWalletInfo | undefined> {
        const wallets = await this.getSecureWallets(network);
        return getWalletUtil(index, wallets);
    }

    async getWalletPrivateKey(index: number, network: NetworkType): Promise<SecureWalletInfo["privateKey"] | undefined> {
        return (await this.getSecureWallet(index, network))?.privateKey;
    }

    /**
     * UNENCRYPTED WALLETS METHODS
     */
    async getUnencrypedWallets(network: NetworkType): Promise<UnencryptedWalletInfo[]> {
        return (await this.get())?.[network] || [];
    }
    async getUnencryptedWallet(index: number, network: NetworkType): Promise<UnencryptedWalletInfo | undefined> {
        const wallets = await this.getUnencrypedWallets(network);
        return getWalletUtil(index, wallets);
    }
    async setUnencryptedWallet(wallet: UnencryptedWalletInfo, network: NetworkType, index: number): Promise<void> {
        const storage = await this.get();
        const wallets = await this.getUnencrypedWallets(network);
        if (storage && wallets) {
            const newWallets = setWallet(wallets, wallet, index);
            await this.set({ ...storage, [network]: newWallets });
        }
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
        const wallets = await this.getUnencrypedWallets(network);
        const storage = await this.get();
        if (!wallets || !storage) return;
        const updatedWallets = updateWalletUncommittedTxHashes(wallets, index, network, hashes);
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
