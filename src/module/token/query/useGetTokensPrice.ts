import { useQuery } from "react-query";
import { QueryResult } from "refactor/ui/common/query/react-query-overrides";
import Queries from "../../../refactor/ui/common/query/queries";
import { config } from "refactor/common/config";
import { useRecoilValue } from "recoil";
import settingsState, { NetworkType } from "module/settings/state/SettingsState";
import { Chains } from "near-peersyst-sdk";

export interface TokenPriceInfo {
    price: string;
    decimal: string;
    symbol: string;
}

export type TokenPrices = Record<string, TokenPriceInfo>;

export const TOKEN_PRICE_URLS: Record<NetworkType, string> = {
    [Chains.MAINNET]: config.mainnetTokenPriceUrl,
    [Chains.TESTNET]: config.testnetTokenPriceUrl,
};

export const useGetTokensPrice = (): QueryResult<TokenPrices | undefined> => {
    const { network } = useRecoilValue(settingsState);
    const url = TOKEN_PRICE_URLS[network];
    return useQuery(
        [Queries.TOKENS_PRICE, network],
        async () => {
            try {
                return await (await fetch(url)).json();
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn("Error fetching price", JSON.stringify(e));
                return undefined;
            }
        },
        { refetchInterval: config.refetchIntervals.fiatPrice },
    );
};
