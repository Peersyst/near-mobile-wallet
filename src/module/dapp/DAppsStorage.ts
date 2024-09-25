import { BaseStorageService } from "module/common/service/BaseStorageService";
import { DAppsState, defaulDAppsState, StoredDApp } from "./state/DAppsState";

export const DAppsStorage = new (class extends BaseStorageService<undefined, DAppsState> {
    constructor() {
        super("dapps");
    }

    async getDApps(): Promise<DAppsState> {
        return (await this.get()) || { favourites: [] };
    }

    async deleteDApp(dApp: StoredDApp): Promise<void> {
        const storedValues = await this.get();
        const url = dApp.url;
        if (storedValues) {
            await this.set({
                favourites: storedValues.favourites.filter((dApp) => dApp.url !== url),
            });
        }
    }

    async addDApp(dApp: StoredDApp): Promise<void> {
        const storedValues = await this.get();
        if (storedValues) {
            await this.set({
                favourites: [...storedValues.favourites, dApp],
            });
        }
    }

    async set(values: Partial<DAppsState>): Promise<void> {
        const storedValues = await this.get();
        await super.set({ ...(storedValues || defaulDAppsState), ...values });
    }
})();
