import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";
import { useNetInfo } from "@react-native-community/netinfo";

export type CoinPrice = Record<string, string | undefined>;

export const useGetIPCountry = (): QueryResult<string | undefined> & { isEnabled: boolean } => {
    const netInfo = useNetInfo();
    const isEnabled = Boolean(netInfo.isConnected && netInfo.isInternetReachable);

    return {
        ...useQuery(
            [Queries.GET_COUNTRY_BY_IP, netInfo],
            async () => {
                try {
                    const geoIPInfo = await (await fetch(`https://reallyfreegeoip.org/json/`)).json();
                    return geoIPInfo?.country_code;
                } catch (e: any) {
                    // eslint-disable-next-line no-console
                    console.warn("Error loading IP geo info", JSON.stringify(e));
                    return undefined;
                }
            },
            {
                enabled: isEnabled,
            },
        ),
        isEnabled,
    };
};
