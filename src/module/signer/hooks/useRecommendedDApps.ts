import { useConfig } from "@peersyst/react-native-components";

export default function useRecommendedDApps() {
    const { recommendedDApps } = useConfig("signerFeature");

    return recommendedDApps;
}
