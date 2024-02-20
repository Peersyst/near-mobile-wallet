import { BiometricsAuthenticationOptions, BiometricsType } from "refactor/common/models/auth/biometrics";

export interface IBiometricsController {
    authenticate(options?: BiometricsAuthenticationOptions): Promise<boolean>;
    isBiometricsAvailable(): Promise<boolean>;
    getSupportedBiometric(): Promise<BiometricsType | undefined>;
    isBiometricsEnabled(): Promise<boolean>;
    setBiometricsEnabled(enabled: boolean): Promise<void>;
    removeBiometricsPreferences(): Promise<void>;
}
