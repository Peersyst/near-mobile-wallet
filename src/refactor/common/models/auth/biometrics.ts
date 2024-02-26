export enum BiometricsType {
    FINGERPRINT = "fingerprint",
    FACIAL_RECOGNITION = "facial-recognition",
    IRIS = "iris",
}

export interface BiometricsAuthenticationOptions {
    cancelLabel?: string;
    disableDeviceFallback?: boolean;
    fallbackLabel?: string;
    promptMessage?: string;
}

export interface BiometricsPreferences {
    enabled: boolean;
}
