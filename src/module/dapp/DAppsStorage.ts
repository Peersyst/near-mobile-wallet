import { BaseStorageService } from "module/common/service/BaseStorageService";
import { IDAppsStorage, defaulDAppsState, StoredDApp } from "./state/DAppsState";

export const DAppsStorage = new (class extends BaseStorageService<undefined, IDAppsStorage> {
    constructor() {
        super("dapps");
    }

    async get(): Promise<IDAppsStorage> {
        return (await super.get()) || defaulDAppsState;
    }

    async getDApps(): Promise<StoredDApp[]> {
        return (await this.get()).favourites;
    }

    async deleteDApp(dApp: StoredDApp): Promise<void> {
        await this.updateFavourites((favourites) => {
            return favourites.filter((item) => item.url !== dApp.url);
        });
    }

    async addDApp(dApp: StoredDApp): Promise<void> {
        await this.updateFavourites((favourites) => {
            return [...favourites, dApp];
        });
    }

    async addHistory(url: string): Promise<void> {
        await this.updateHistory((history) => {
            return [url, ...history.filter((item) => item !== url)].slice(0, 5);
        });
    }

    async getHistory(): Promise<string[]> {
        return (await this.get()).history;
    }

    async updateHistory(updater: (params: string[]) => string[]): Promise<void> {
        await this.update((storedValues) => {
            return {
                ...storedValues,
                history: updater(storedValues.history),
            };
        });
    }

    async updateFavourites(updater: (params: StoredDApp[]) => StoredDApp[]): Promise<void> {
        await this.update((storedValues) => {
            return {
                ...storedValues,
                favourites: updater(storedValues.favourites),
            };
        });
    }

    async update(updater: (params: IDAppsStorage) => IDAppsStorage): Promise<void> {
        const storedValues = await this.get();
        await super.set(updater(storedValues || defaulDAppsState));
    }
})();
