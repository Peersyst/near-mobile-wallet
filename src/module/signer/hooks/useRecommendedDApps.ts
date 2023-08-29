import { useConfig } from "@peersyst/react-native-components";
import { RecommendedDAppsFilters } from "../containers/RecommendedDApps/RecommendedDApps.types";

export default function useRecommendedDApps(props: RecommendedDAppsFilters) {
    const { query, tag: tagProp } = props;

    const { recommendedDApps } = useConfig("signerFeature");

    return recommendedDApps.filter(
        ({ name, tag }) => name.toLowerCase().includes(query.toLowerCase()) && (tagProp === "all" ? true : tagProp === tag),
    );
}
