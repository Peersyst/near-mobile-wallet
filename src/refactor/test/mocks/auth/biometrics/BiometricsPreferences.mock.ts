import { BiometricsPreferences } from "refactor/common/models";

export class BiometricsPreferencesMock implements BiometricsPreferences {
    enabled: boolean;

    constructor({ enabled = true }: Partial<BiometricsPreferencesMock> = {}) {
        this.enabled = enabled;
    }
}
