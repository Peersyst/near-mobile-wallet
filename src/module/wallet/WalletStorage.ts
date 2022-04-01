import { BaseStorageService } from "module/common/service/BaseStorageService";
import { SdkWalletState } from "module/common/service/mock/CkbServiceMock.types";

export interface StorageWallet {
    index: number;
    name: string;
    colorIndex: number;
    mnemonic: string[];
    initialState?: SdkWalletState;
}

export interface WalletStorageType {
    wallets: StorageWallet[];
    pin: string | undefined;
}

export const WalletStorage = new (class extends BaseStorageService<WalletStorageType> {
    constructor() {
        super("wallet");
    }

    async getWallets(): Promise<StorageWallet[] | undefined> {
        const storage = await this.get();
        return storage?.wallets;
    }

    async getWallet(index: number): Promise<StorageWallet | undefined> {
        const storage = await this.get();
        return storage?.wallets[index];
    }

    async getName(index: number): Promise<string | undefined> {
        const storage = await this.get();
        return storage?.wallets[index]?.name;
    }

    async getColorIndex(index: number): Promise<number | undefined> {
        const storage = await this.get();
        return storage?.wallets[index]?.colorIndex;
    }

    async getMnemonic(index: number): Promise<string[] | undefined> {
        const storage = await this.get();
        return storage?.wallets[index]?.mnemonic;
    }

    async getInitialState(index: number): Promise<SdkWalletState | undefined> {
        const storage = await this.get();
        return storage?.wallets[index]?.initialState;
    }

    async getPin(): Promise<string | undefined> {
        const storage = await this.get();
        return storage?.pin;
    }

    async setWallets(wallets: StorageWallet[]): Promise<void> {
        const storage = (await this.get()) || { pin: undefined };
        await this.set({ ...storage, wallets });
    }

    async addWallet(wallet: Omit<StorageWallet, "index">): Promise<StorageWallet | undefined> {
        const wallets = (await this.getWallets()) || [];
        const newWallet = { ...wallet, index: wallets.length };
        wallets?.push(newWallet);
        await this.setWallets(wallets);
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
        if (wallets) await this.setWallets(wallets.filter((_, i) => i !== index));
    }

    async setPin(pin: string): Promise<void> {
        const storage = (await this.get()) || { wallets: [] };
        await this.set({ ...storage, pin });
    }
})();
