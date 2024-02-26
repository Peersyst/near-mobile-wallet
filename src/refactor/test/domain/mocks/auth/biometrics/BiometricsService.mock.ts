import { BiometricsType } from "refactor/common/models";
import { IBiometricsService } from "refactor/domain/adapter/service/IBiometricsService";
import MethodMock from "refactor/test/utils/MethodMock";
import createMock from "refactor/test/utils/createMock";

export const BiometricsServiceMock = createMock<IBiometricsService>({
    authenticate: new MethodMock("mockResolvedValue", true),
    isBiometricsAvailable: new MethodMock("mockResolvedValue", true),
    getSupportedBiometric: new MethodMock("mockResolvedValue", BiometricsType.FINGERPRINT),
});
