import { config } from "config";

export default function useRecommendedDApps() {
    const { recommendedDApps } = config.signerFeature;

    return recommendedDApps;
}
