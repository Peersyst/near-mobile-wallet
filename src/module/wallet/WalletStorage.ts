import { WalletState } from "ckb-peersyst-sdk";
import { BaseStorageService } from "module/common/service/BaseStorageService";

export interface UnencryptedWalletInfo {
    index: number;
    initialState?: WalletState;
    uncommittedTransactionHashes?: string[];
}

export interface SecureWalletInfo {
    index: number;
    name: string;
    colorIndex: number;
    mnemonic: string[];
}

export type StorageWallet = SecureWalletInfo & UnencryptedWalletInfo;

export interface SecureWalletStorageType {
    wallets: SecureWalletInfo[];
    pin: string | undefined;
}

export interface UnsecureWalletStorageType {
    wallets: UnencryptedWalletInfo[];
}

export const WalletStorage = new (class extends BaseStorageService<SecureWalletStorageType, UnsecureWalletStorageType> {
    constructor() {
        super("wallet");
    }

    async getWallets(): Promise<StorageWallet[] | undefined> {
        const secureStorage = await this.getSecure();
        if (!secureStorage) return undefined;
        const storage = await this.get();
        const wallets: StorageWallet[] = [];
        for (let i = 0; i < secureStorage.wallets.length; i++) {
            const walletSecureInfo = secureStorage.wallets.find((w) => w.index === i);
            if (walletSecureInfo) {
                const walletUnencryptedInfo = storage?.wallets.find((w) => w.index === i) || { index: i };
                wallets.push({ ...walletSecureInfo, ...walletUnencryptedInfo });
            }
        }

        return wallets;
    }

    async getWallet(index: number): Promise<StorageWallet | undefined> {
        const secureStorage = await this.getSecure();
        const walletSecureInfo = secureStorage?.wallets.find((w) => w.index === index);
        if (!walletSecureInfo) return undefined;
        const storage = await this.get();
        const walletUnencryptedInfo = storage?.wallets.find((w) => w.index === index) || { index: index };
        return { ...walletSecureInfo, ...walletUnencryptedInfo };
    }

    async getName(index: number): Promise<string | undefined> {
        const secureStorage = await this.getSecure();
        const walletSecureInfo = secureStorage?.wallets.find((w) => w.index === index);
        return walletSecureInfo?.name;
    }

    async getColorIndex(index: number): Promise<number | undefined> {
        const secureStorage = await this.getSecure();
        const walletSecureInfo = secureStorage?.wallets.find((w) => w.index === index);
        return walletSecureInfo?.colorIndex;
    }

    async getMnemonic(index: number): Promise<string[] | undefined> {
        const secureStorage = await this.getSecure();
        const walletSecureInfo = secureStorage?.wallets.find((w) => w.index === index);
        return walletSecureInfo?.mnemonic;
    }

    async getInitialState(index: number): Promise<WalletState | undefined> {
        const storage = await this.get();
        const walletUnencryptedInfo = storage?.wallets.find((w) => w.index === index) || { index: index };
        return walletUnencryptedInfo?.initialState;
    }

    async getUncommittedTransactionHashes(index: number): Promise<string[] | undefined> {
        const storage = await this.get();
        const walletUnencryptedInfo = storage?.wallets.find((w) => w.index === index) || { index: index };
        return walletUnencryptedInfo?.uncommittedTransactionHashes;
    }

    async addUncommittedTransactionHash(index: number, hash: string): Promise<void> {
        const storage = await this.get();
        if (!storage) return;
        const updatedWallets = storage?.wallets.map((w) =>
            w.index === index ? { ...w, uncommittedTransactionHashes: [...(w.uncommittedTransactionHashes || []), hash] } : w,
        );
        return this.set({ ...storage, wallets: updatedWallets });
    }

    async removeUncommittedTransactionHash(index: number, hash: string): Promise<void> {
        const storage = await this.get();
        if (!storage) return;
        const updatedWallets = storage?.wallets.map((w) =>
            w.index === index
                ? {
                      ...w,
                      uncommittedTransactionHashes: w.uncommittedTransactionHashes
                          ? w.uncommittedTransactionHashes.filter((h) => h !== hash)
                          : [],
                  }
                : w,
        );
        return this.set({ ...storage, wallets: updatedWallets });
    }

    async getPin(): Promise<string | undefined> {
        const secureStorage = await this.getSecure();
        return secureStorage?.pin;
    }

    async setWallets(wallets: StorageWallet[]): Promise<void> {
        const walletsSecureInfo: SecureWalletInfo[] = [];
        const walletsUnencryptedInfo: UnencryptedWalletInfo[] = [];
        wallets.forEach(({ index, initialState, ...secureData }) => {
            walletsSecureInfo.push({ index, ...secureData });
            walletsUnencryptedInfo.push({ index, initialState });
        });
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

    async setPin(pin: string): Promise<void> {
        const secureStorage = (await this.getSecure()) || { wallets: [] };
        await this.setSecure({ ...secureStorage, pin });
    }

    async setInitialState(index: number, walletState: WalletState): Promise<void> {
        const wallets = await this.getWallets();
        if (wallets) {
            await this.setWallets(wallets.map((wallet) => (wallet.index === index ? { ...wallet, initialState: walletState } : wallet)));
        }
    }
})();
