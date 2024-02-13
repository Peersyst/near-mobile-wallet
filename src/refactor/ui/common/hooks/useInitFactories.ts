import { useEffect, useState } from "react";
import RepositoryFactory from "refactor/domain/adapter/RepositoryFactory";
import ServiceFactory from "refactor/domain/adapter/ServiceFactory";
import ControllerFactory from "refactor/ui/adapter/ControllerFactory";

export function useInitFactories(): boolean {
    const [isInitialized, setIsInitialized] = useState(false);

    async function initFactories(): Promise<void> {
        await RepositoryFactory.init();
        await ServiceFactory.init();
        await ControllerFactory.init();
    }

    useEffect(() => {
        initFactories().then(() => setIsInitialized(true));
    }, []);

    return isInitialized;
}
