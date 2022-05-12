import { ScriptType } from "./../../sdk/core/transaction.service";
import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { FiatCurrencyType } from "module/settings/state/SettingsState";
import { getTokenIndexTypeFromScript } from "module/common/service/CkbSdkService";

// Refetch the data every 3 minutes
const CONVERSION_PRICE_INTERVAL = 1000 * 60 * 3;

type ApiIdType = "usd-coin" | "binancecoin" | "ethereum" | "tether" | "wrapped-bitcoin";

//It have to be in same order than tokensList
const apiIdList: ApiIdType[] = ["usd-coin", "binancecoin", "ethereum", "usd-coin", "tether", "wrapped-bitcoin"];

function getApiIdFromCodeHashAndArgs(scriptType: ScriptType): ApiIdType | undefined {
    const tokenIndex = getTokenIndexTypeFromScript(scriptType);
    if (tokenIndex !== -1) {
        return apiIdList[tokenIndex];
    }
}

export const useGetTokenPrice = (currency: FiatCurrencyType, scriptType: ScriptType): QueryResult<number | undefined> =>
    useQuery(
        ["tokenPrice", currency, scriptType],
        async () => {
            const apiId: ApiIdType | undefined = getApiIdFromCodeHashAndArgs(scriptType);
            if (apiId) {
                const res: any = await fetch(`https://api.coingecko.com/api/v3/coins/${apiId}`);
                const data = await res.json();

                return data?.market_data?.current_price[currency];
            } else return undefined;
        },
        {
            refetchInterval: CONVERSION_PRICE_INTERVAL,
        },
    );
