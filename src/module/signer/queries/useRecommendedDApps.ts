import { config } from "config";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";
import { DApp } from "../types";

export default function useRecommendedDApps() {
    return useQuery(
        [Queries.RECOMMENDED_DAPPS],
        () =>
            new Promise<DApp[]>((resolve) => {
                setTimeout(() => {
                    resolve(config.signerFeature.recommendedDApps.map((dapp) => ({ ...dapp, isDisconnected: false })));
                });
            }),
    );
}
