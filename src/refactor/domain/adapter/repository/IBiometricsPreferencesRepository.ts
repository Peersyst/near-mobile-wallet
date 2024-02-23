import { BiometricsPreferences } from "module/auth/hook/useBiometrics";

export interface IBiometricsPreferencesRepository {
    getBiometricsPreferences(): Promise<BiometricsPreferences | undefined>;
    setBiometricsPreferences(preferences: BiometricsPreferences): Promise<void>;
    removeBiometricsPreferences(): Promise<void>;
    getEnabled(): Promise<boolean>;
    setEnabled(enabled: boolean): Promise<void>;
}
