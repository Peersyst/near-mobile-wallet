import createMock from "refactor/test/utils/createMock";
import MethodMock from "refactor/test/utils/MethodMock";
import { BiometricsType } from "refactor/common/models";
import { IBiometricsController } from "refactor/ui/adapter/controllers/IBiometricsController";

export const BiometricsControllerMock = createMock<IBiometricsController>({
    authenticate: new MethodMock("mockResolvedValue", true),
    isBiometricsAvailable: new MethodMock("mockResolvedValue", true),
    getSupportedBiometric: new MethodMock("mockResolvedValue", BiometricsType.FINGERPRINT),
    isBiometricsEnabled: new MethodMock("mockResolvedValue", true),
    setBiometricsEnabled: new MethodMock("mockResolvedValue"),
    removeBiometricsPreferences: new MethodMock("mockResolvedValue"),
});
