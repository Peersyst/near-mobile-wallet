import { config } from "config";
import useIsMainnet from "module/settings/hook/useIsMainnet";
import useGetIntentsLink from "./useGetIntentsLink";
import { useConfig } from "@peersyst/react-native-components";

export interface GetSwapLinkParams {
    showIntentsIfPossible?: boolean;
    contractId?: string;
}

export default function useGetSwapLink({ contractId = "near", showIntentsIfPossible = false }: GetSwapLinkParams = {}): string {
    const isMainnet = useIsMainnet();
    const { enabled: intentsEnabled } = useConfig("intents");
    const intentsUrl = useGetIntentsLink({ type: "swap" });

    if (isMainnet && showIntentsIfPossible && intentsEnabled) {
        return intentsUrl;
    }
    const swapUrl = isMainnet ? config.mainnetSwapUrl : config.testnetSwapUrl;
    return `${swapUrl}/#${contractId}|near`;
}
