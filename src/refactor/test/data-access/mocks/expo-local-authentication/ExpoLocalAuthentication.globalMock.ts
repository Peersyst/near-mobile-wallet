import createGlobalMock from "refactor/test/utils/createGlobalMock";
import * as ExpoLocalAuthentication from "expo-local-authentication";
import MethodMock from "refactor/test/utils/MethodMock";

export const ExpoLocalAuthenticationGlobalMock = createGlobalMock(ExpoLocalAuthentication, {
    hasHardwareAsync: new MethodMock("mockResolvedValue", true),
    supportedAuthenticationTypesAsync: new MethodMock("mockResolvedValue", [ExpoLocalAuthentication.AuthenticationType.FACIAL_RECOGNITION]),
    isEnrolledAsync: new MethodMock("mockResolvedValue", true),
    getEnrolledLevelAsync: new MethodMock("mockResolvedValue", ExpoLocalAuthentication.SecurityLevel.SECRET),
    authenticateAsync: new MethodMock("mockResolvedValue", { success: true }),
    cancelAuthenticate: new MethodMock("mockResolvedValue"),
});
