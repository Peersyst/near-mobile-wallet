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
                    const ip = await (await fetch(`https://api.ipify.org`)).text(); // Unlimited usage
                    const geoIpInfo = await (await fetch(`http://ip-api.com/json/${ip}`)).json(); // 45 requests per minute
                    return geoIpInfo?.countryCode;
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.warn("Error loading coingecko price", JSON.stringify(e));
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
