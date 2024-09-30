import { DAppsStorage } from "./DAppsStorage";
import { StoredDApp } from "./state/DAppsState";

export default new (class DAppsController {
    async getDApps() {
        return await DAppsStorage.getDApps();
    }

    async deleteDApp(dApp: StoredDApp) {
        return await DAppsStorage.deleteDApp(dApp);
    }

    async addDApp(dApp: StoredDApp) {
        return await DAppsStorage.addDApp(dApp);
    }

    async getHistory() {
        return await DAppsStorage.getHistory();
    }

    async addHistory(history: string) {
        return await DAppsStorage.addHistory(history);
    }
})();
