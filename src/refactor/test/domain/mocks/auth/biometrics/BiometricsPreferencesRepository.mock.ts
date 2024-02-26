import { IBiometricsPreferencesRepository } from "refactor/domain/adapter/repository/IBiometricsPreferencesRepository";
import createMock from "refactor/test/utils/createMock";
import MethodMock from "refactor/test/utils/MethodMock";
import { BiometricsPreferencesMock } from "../../../../mocks/auth/biometrics/BiometricsPreferences.mock";

export const BiometricsPreferencesRepositoryMock = createMock<IBiometricsPreferencesRepository>({
    getBiometricsPreferences: new MethodMock("mockResolvedValue", new BiometricsPreferencesMock()),
    setBiometricsPreferences: new MethodMock("mockResolvedValue"),
    getEnabled: new MethodMock("mockResolvedValue", true),
    setEnabled: new MethodMock("mockResolvedValue"),
    removeBiometricsPreferences: new MethodMock("mockResolvedValue"),
});
