import {
    AuthenticationType,
    isEnrolledAsync,
    supportedAuthenticationTypesAsync,
    authenticateAsync,
    LocalAuthenticationOptions,
} from "expo-local-authentication";
import { useEffect, useState } from "react";

export interface UseBiometricsResult {
    isLoading: boolean;
    isEnrolled: boolean;
    biometric: AuthenticationType | 0;
    authenticate: () => void;
}

export interface UseBiometricsParams extends LocalAuthenticationOptions {
    authenticateOnMount?: boolean;
    onAuthenticationSuccess: () => void;
    onAuthenticationError?: () => void;
}

export default function ({
    authenticateOnMount = true,
    onAuthenticationSuccess,
    onAuthenticationError,
    ...options
}: UseBiometricsParams): UseBiometricsResult {
    const [isLoading, setIsLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [biometric, setBiometric] = useState<AuthenticationType>(0);

    useEffect(() => {
        const isEnrolledPromise = isEnrolledAsync()
            .then((res) => {
                if (res) setIsEnrolled(true);
            })
            .catch(() => undefined);

        const biometricPromise = supportedAuthenticationTypesAsync()
            .then((res) => {
                if (res.length) setBiometric(res[res.length - 1]);
            })
            .catch(() => undefined);

        Promise.all([isEnrolledPromise, biometricPromise]).finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (isEnrolled && authenticateOnMount) authenticate();
    }, [isEnrolled, authenticateOnMount]);

    const authenticate = (): void => {
        authenticateAsync(options)
            .then((res) => {
                if (res.success) onAuthenticationSuccess();
                else onAuthenticationError?.();
            })
            .catch(() => onAuthenticationError?.());
    };

    return {
        isLoading,
        isEnrolled,
        biometric,
        authenticate,
    };
}
