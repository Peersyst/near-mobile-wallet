import { config } from "refactor/common/config";
import Queries from "../../../query/queries";
import { UseQueryResult, useQuery } from "react-query";

export default function useConnectedSiteLogo(contractId: string): UseQueryResult<string, unknown> {
    return useQuery(
        [Queries.GET_CONNECTED_SITE_LOGO, contractId],
        () =>
            new Promise<string>((resolve) => {
                const logo = config.signerFeature.recommendedDApps.find(({ contractId: id }) => id === contractId)?.logoUrl || "";
                resolve(logo);
            }),
    );
}
