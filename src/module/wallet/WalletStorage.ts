import { BaseStorageService } from "module/common/service/BaseStorageService";

export interface WalletStorageType {
    name: string;
    pin: string;
    mnemonic: string[];
}

export const WalletStorage = new (class extends BaseStorageService<WalletStorageType> {
    constructor() {
        super("wallet");
    }

    async getName(): Promise<string | undefined> {
        const wallet = await this.get();
        return wallet?.name;
    }

    async getPin(): Promise<string | undefined> {
        const wallet = await this.get();
        return wallet?.pin;
    }

    async getMnemonic(): Promise<string[] | undefined> {
        const wallet = await this.get();
        return wallet?.mnemonic;
    }
})();
