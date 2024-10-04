import { DAppsStorage } from "./DAppsStorage";
import { FavouriteDApp } from "./types";

export default new (class DAppsController {
    async getDApps() {
        return await DAppsStorage.getDApps();
    }

    async deleteDApp(url: string) {
        return await DAppsStorage.deleteDApp(url);
    }

    async addDApp(dApp: FavouriteDApp) {
        return await DAppsStorage.addDApp(dApp);
    }

    async getHistory() {
        return await DAppsStorage.getHistory();
    }

    async addHistory(history: string) {
        return await DAppsStorage.addHistory(history);
    }
})();
