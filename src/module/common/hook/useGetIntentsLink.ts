import { useConfig } from "@peersyst/react-native-components";

export interface UseGetIntentsLink {
    type: "deposit" | "withdraw" | "swap";
}

export default function useGetIntentsLink({ type }: UseGetIntentsLink): string {
    const intentsConfig = useConfig("intents");
    const baseUrl = intentsConfig.baseUrl;
    switch (type) {
        case "deposit":
            return `${baseUrl}${intentsConfig.depositPath}`;
        case "withdraw":
            return `${baseUrl}${intentsConfig.withdrawPath}`;
        case "swap":
            return `${baseUrl}${intentsConfig.swapPath}`;
    }
}
