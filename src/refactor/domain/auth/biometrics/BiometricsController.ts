import { BiometricsAuthenticationOptions, BiometricsType } from "refactor/common/models/auth/biometrics";
import { IBiometricsPreferencesRepository } from "refactor/domain/adapter/repository/IBiometricsPreferencesRepository";
import { IBiometricsService } from "refactor/domain/adapter/service/IBiometricsService";
import { IBiometricsController } from "refactor/ui/adapter/controllers/IBiometricsController";

export default class BiometricsController implements IBiometricsController {
    constructor(
        private readonly biometricsService: IBiometricsService,
        private readonly biometricsPreferencesRepository: IBiometricsPreferencesRepository,
    ) {}

    /**
     * Authenticates using biometrics
     * @param options
     */
    authenticate(options: BiometricsAuthenticationOptions = {}): Promise<boolean> {
        return this.biometricsService.authenticate({ disableDeviceFallback: true, fallbackLabel: "", ...options });
    }

    /**
     * Checks if biometrics is available
     */
    isBiometricsAvailable(): Promise<boolean> {
        return this.biometricsService.isBiometricsAvailable();
    }

    /**
     * Gets the supported biometric
     */
    getSupportedBiometric(): Promise<BiometricsType | undefined> {
        return this.biometricsService.getSupportedBiometric();
    }

    /**
     * Checks if biometrics is enabled
     */
    async isBiometricsEnabled(): Promise<boolean> {
        return this.biometricsPreferencesRepository.getEnabled();
    }

    /**
     * Sets biometrics enabled
     * @param enabled Whether biometrics is enabled
     */
    async setBiometricsEnabled(enabled: boolean): Promise<void> {
        return this.biometricsPreferencesRepository.setEnabled(enabled);
    }

    /**
     * Removes biometrics preferences
     */
    removeBiometricsPreferences(): Promise<void> {
        return this.biometricsPreferencesRepository.removeBiometricsPreferences();
    }
}
