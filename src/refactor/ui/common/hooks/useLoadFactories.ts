import ServiceFactory from "refactor/domain/adapter/ServiceFactory";
import { useEffect, useRef, useState } from "react";
import ControllerFactory from "refactor/ui/adapter/ControllerFactory";
import isDomainError from "refactor/ui/adapter/utils/isDomainError";

export function useLoadFactories(areFactoriesInitialized: boolean): boolean {
    const [isLoaded, setIsLoaded] = useState(false);
    const loadingRef = useRef(false);
    const loadCleanupRef = useRef<() => void>();

    const loadFactories = async () => {
        try {
            const serviceLoadCleanup = await ServiceFactory.load();
            const controllerLoadCleanup = await ControllerFactory.load();
            loadCleanupRef.current = () => {
                serviceLoadCleanup();
                controllerLoadCleanup();
            };
        } catch (e) {
            if (!isDomainError(e)) throw e;
        }
    };

    useEffect(() => {
        if (areFactoriesInitialized && !loadingRef.current) {
            loadingRef.current = true;

            if (loadCleanupRef.current) loadCleanupRef.current();

            loadFactories()
                .then(() => {
                    setIsLoaded(true);
                })
                .finally(() => {
                    loadingRef.current = false;
                });
        }
    }, [areFactoriesInitialized]);

    return isLoaded;
}
