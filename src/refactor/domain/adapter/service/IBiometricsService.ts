import { BiometricsAuthenticationOptions, BiometricsType } from "refactor/common/models/auth/biometrics";

export interface IBiometricsService {
    authenticate(options: BiometricsAuthenticationOptions): Promise<boolean>;
    isBiometricsAvailable(): Promise<boolean>;
    getSupportedBiometric(): Promise<BiometricsType | undefined>;
}
