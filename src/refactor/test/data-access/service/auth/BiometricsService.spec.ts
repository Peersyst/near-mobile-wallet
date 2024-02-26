import { IBiometricsService } from "refactor/domain/adapter/service/IBiometricsService";
import { ExpoLocalAuthenticationGlobalMock } from "../../mocks/expo-local-authentication/ExpoLocalAuthentication.globalMock";
import BiometricsService from "refactor/data-access/service/auth/BiometricsService";
import { AuthenticationType } from "expo-local-authentication";
import { BiometricsType } from "refactor/common/models";

describe("BiometricsService", () => {
    let biometricsService: IBiometricsService;
    const expoLocalAuthenticationGlobalMock = new ExpoLocalAuthenticationGlobalMock();

    beforeEach(() => {
        expoLocalAuthenticationGlobalMock.clearMocks();
        biometricsService = new BiometricsService();
    });

    describe("authenticate", () => {
        test("Should authenticate using biometrics", async () => {
            const options = {};
            expoLocalAuthenticationGlobalMock.authenticateAsync.mockResolvedValueOnce({ success: true });
            const result = await biometricsService.authenticate(options);
            expect(expoLocalAuthenticationGlobalMock.authenticateAsync).toHaveBeenCalledWith(options);
            expect(result).toEqual(true);
        });

        test("Should return false if biometrics authentication fails", async () => {
            const options = {};
            expoLocalAuthenticationGlobalMock.authenticateAsync.mockResolvedValueOnce({ success: false });
            const result = await biometricsService.authenticate(options);
            expect(expoLocalAuthenticationGlobalMock.authenticateAsync).toHaveBeenCalledWith(options);
            expect(result).toEqual(false);
        });
    });

    describe("isBiometricsAvailable", () => {
        test("Should return true if biometrics are available", async () => {
            expoLocalAuthenticationGlobalMock.isEnrolledAsync.mockResolvedValueOnce(true);
            const result = await biometricsService.isBiometricsAvailable();
            expect(result).toEqual(true);
        });

        test("Should return false if biometrics are not available", async () => {
            expoLocalAuthenticationGlobalMock.isEnrolledAsync.mockResolvedValueOnce(false);
            const result = await biometricsService.isBiometricsAvailable();
            expect(result).toEqual(false);
        });
    });

    describe("getSupportedBiometric", () => {
        test("Should return fingerprint when fingerprint is supported", async () => {
            expoLocalAuthenticationGlobalMock.supportedAuthenticationTypesAsync.mockResolvedValueOnce([AuthenticationType.FINGERPRINT]);
            const result = await biometricsService.getSupportedBiometric();
            expect(result).toEqual(BiometricsType.FINGERPRINT);
        });

        test("Should return facial recognition when facial recognition is supported", async () => {
            expoLocalAuthenticationGlobalMock.supportedAuthenticationTypesAsync.mockResolvedValueOnce([
                AuthenticationType.FACIAL_RECOGNITION,
            ]);
            const result = await biometricsService.getSupportedBiometric();
            expect(result).toEqual(BiometricsType.FACIAL_RECOGNITION);
        });

        test("Should return iris when iris is supported", async () => {
            expoLocalAuthenticationGlobalMock.supportedAuthenticationTypesAsync.mockResolvedValueOnce([AuthenticationType.IRIS]);
            const result = await biometricsService.getSupportedBiometric();
            expect(result).toEqual(BiometricsType.IRIS);
        });

        test("Should return undefined if no biometric is supported", async () => {
            expoLocalAuthenticationGlobalMock.supportedAuthenticationTypesAsync.mockResolvedValueOnce([]);
            const result = await biometricsService.getSupportedBiometric();
            expect(result).toEqual(undefined);
        });
    });
});
