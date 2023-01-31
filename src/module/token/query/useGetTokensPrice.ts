import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";
import { config } from "config";
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
            return await (await fetch(url)).json();
        },
        { refetchInterval: config.fetchPriceConversionInterval },
    );
};
