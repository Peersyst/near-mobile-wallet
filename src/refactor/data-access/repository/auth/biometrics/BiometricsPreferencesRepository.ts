import { BiometricsPreferences } from "refactor/common/models";
import StorageRepository from "../../common/StorageRepository";
import { IBiometricsPreferencesRepository } from "refactor/domain/adapter/repository/IBiometricsPreferencesRepository";
import { config } from "refactor/common/config";

export default class BiometricsPreferencesRepository
    extends StorageRepository<BiometricsPreferences>
    implements IBiometricsPreferencesRepository
{
    constructor() {
        super(`${config.projectName}-biometrics-preferences`);
    }

    /**
     * Gets the biometrics preferences
     */
    async getBiometricsPreferences(): Promise<BiometricsPreferences | undefined> {
        return await this.get();
    }

    /**
     * Sets the biometrics preferences
     * @param token
     */
    async setBiometricsPreferences(preferences: BiometricsPreferences): Promise<void> {
        return this.set(preferences);
    }

    /**
     * Gets whether biometrics is enabled
     */
    async getEnabled(): Promise<boolean> {
        const preferences = await this.get();
        return !!preferences?.enabled;
    }

    /**
     * Sets whether biometrics is enabled
     * @param enabled Whether biometrics is enabled
     */
    async setEnabled(enabled: boolean): Promise<void> {
        const preferences = await this.get();
        return this.set({ ...preferences, enabled });
    }

    /**
     * Removes the biometrics preferences
     */
    async removeBiometricsPreferences(): Promise<void> {
        this.clear();
    }
}
