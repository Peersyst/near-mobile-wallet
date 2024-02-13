import { BiometricsAuthenticationOptions, BiometricsType } from "module/auth/hook/useBiometrics";

export interface IBiometricsService {
    authenticate(options: BiometricsAuthenticationOptions): Promise<boolean>;
    isBiometricsAvailable(): Promise<boolean>;
    getSupportedBiometric(): Promise<BiometricsType | undefined>;
}
