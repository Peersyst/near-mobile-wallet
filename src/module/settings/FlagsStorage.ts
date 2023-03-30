import { BaseStorageService } from "module/common/service/BaseStorageService";

export interface Flags {
    // [MAINNET RELEASE]: Removes wallets and forces network to MAINNET
    forcedMainnet?: boolean;
}

const defaultFlags: Flags = {};

export const FlagsStorage = new (class extends BaseStorageService<undefined, Flags> {
    constructor() {
        super("flags");
    }

    async get(): Promise<Flags> {
        const storedValues = await this.get();
        return storedValues || defaultFlags;
    }

    async set(values: Partial<Flags>): Promise<void> {
        const storedValues = await this.get();
        await super.set({ ...(storedValues || defaultFlags), ...values });
    }
})();
