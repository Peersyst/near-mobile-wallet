import { ISettingsRepository } from "refactor/domain/adapter/repository/ISettingsRepository";
import { defaultSettingsState } from "refactor/domain/settings/state/settingsState";
import MethodMock from "refactor/test/utils/MethodMock";
import createMock from "refactor/test/utils/createMock";

export default createMock<ISettingsRepository>({
    getLocale: new MethodMock("mockResolvedValue", "en"),
    getFiat: new MethodMock("mockResolvedValue", "USD"),
    getBiometrics: new MethodMock("mockResolvedValue", false),
    getNetwork: new MethodMock("mockResolvedValue", "mainnet"),
    getAllSettings: new MethodMock("mockResolvedValue", defaultSettingsState),
    clear: new MethodMock("mockResolvedValue"),
    set: new MethodMock("mockResolvedValue"),
});
