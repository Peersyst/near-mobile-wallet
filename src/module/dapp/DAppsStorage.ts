import { BaseStorageService } from "module/common/service/BaseStorageService";
import { IDAppsStorage, FavouriteDApp } from "./types";
import { config } from "config";

const defaultDAppStorage: IDAppsStorage = {
    favourites: [],
    history: [],
};

export const DAppsStorage = new (class extends BaseStorageService<undefined, IDAppsStorage> {
    constructor() {
        super("dapps");
    }

    async get(): Promise<IDAppsStorage> {
        return (await super.get()) || defaultDAppStorage;
    }

    async getDApps(): Promise<FavouriteDApp[]> {
        return (await this.get()).favourites;
    }

    async deleteDApp(dAppUrl: string): Promise<void> {
        await this.updateFavourites((favourites) => {
            return favourites.filter((item) => item.url !== dAppUrl);
        });
    }

    async addDApp(dApp: FavouriteDApp): Promise<void> {
        await this.updateFavourites((favourites) => {
            return [dApp, ...favourites];
        });
    }

    async addHistory(url: string): Promise<void> {
        await this.updateHistory((history) => {
            return [url, ...history.filter((item) => item !== url)].slice(0, config.exploreDApps.historyLimit);
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

    async updateFavourites(updater: (params: FavouriteDApp[]) => FavouriteDApp[]): Promise<void> {
        await this.update((storedValues) => {
            return {
                ...storedValues,
                favourites: updater(storedValues.favourites),
            };
        });
    }

    async update(updater: (params: IDAppsStorage) => IDAppsStorage): Promise<void> {
        const storedValues = await this.get();
        await super.set(updater(storedValues || defaultDAppStorage));
    }
})();
