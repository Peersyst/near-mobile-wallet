export enum BiometricsType {
    FINGERPRINT = "fingerprint",
    FACIAL_RECOGNITION = "facial-recognition",
    IRIS = "iris",
}

export type BiometricsAuthenticationOptions = {
    cancelLabel?: string;
    disableDeviceFallback?: boolean;
    fallbackLabel?: string;
    promptMessage?: string;
};

export type BiometricsPreferences = {
    enabled: boolean;
};
