import * as LocalAuthentication from "expo-local-authentication";
import { BiometricsAuthenticationOptions, BiometricsType } from "refactor/common/models";
import { IBiometricsService } from "refactor/domain/adapter/service/IBiometricsService";

export default class BiometricsService implements IBiometricsService {
    /**
     * Authenticates using biometrics
     * @param options
     */
    async authenticate(options: BiometricsAuthenticationOptions): Promise<boolean> {
        const res = await LocalAuthentication.authenticateAsync(options);
        return res.success;
    }

    /**
     * Checks if biometrics is available
     */
    isBiometricsAvailable(): Promise<boolean> {
        return LocalAuthentication.isEnrolledAsync();
    }

    /**
     * Gets the supported biometric
     */
    async getSupportedBiometric(): Promise<BiometricsType | undefined> {
        const supportedAuthTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

        if (supportedAuthTypes.length === 0) return undefined;

        switch (supportedAuthTypes[0]) {
            case LocalAuthentication.AuthenticationType.FINGERPRINT:
                return BiometricsType.FINGERPRINT;
            case LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION:
                return BiometricsType.FACIAL_RECOGNITION;
            case LocalAuthentication.AuthenticationType.IRIS:
                return BiometricsType.IRIS;
            default:
                return undefined;
        }
    }
}
