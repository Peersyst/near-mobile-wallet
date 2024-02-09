import { config } from "refactor/common/config";
import { RecommendedDAppsFilters } from "../containers/RecommendedDApps/RecommendedDApps.types";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";
import { DApp } from "../types";

export default function useRecommendedDApps(props: RecommendedDAppsFilters) {
    const { query, tag: tagProp } = props;
    return useQuery(
        [Queries.RECOMMENDED_DAPPS, query, tagProp],
        () =>
            new Promise<DApp[]>((resolve) => {
                const filteredRecommendedDapps = config.signerFeature.recommendedDApps.filter(
                    ({ name, tag }) => name.toLowerCase().includes(query.toLowerCase()) && (tagProp === "all" ? true : tagProp === tag),
                );
                resolve(filteredRecommendedDapps);
            }),
    );
}
