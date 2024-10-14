import { config } from "config";
import Queries from "../../../query/queries";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

export interface UseConnectedSiteLogoParams {
    contractId?: string;
    url?: string;
}

export default function useConnectedSiteLogo(
    { contractId, url }: UseConnectedSiteLogoParams,
    { enabled, ...rest }: UseQueryOptions<string | undefined, unknown, string, [Queries, string | undefined, string | undefined]> = {},
): UseQueryResult<string, unknown> {
    {
        return useQuery(
            [Queries.GET_CONNECTED_SITE_LOGO, contractId, url],
            () =>
                new Promise<string>((resolve) => {
                    const dApps = config.signerFeature.recommendedDApps;
                    const dApp = dApps.find((dApp) => {
                        return dApp.contractId === contractId || (url ? dApp.url.includes(url) : false);
                    });
                    const logo = dApp?.logoUrl || "";
                    resolve(logo);
                }),
            {
                enabled: enabled && !!(contractId || url),
                ...rest,
            },
        );
    }
}
