import { useConfig } from "@peersyst/react-native-components";
import { useGetIPCountry } from "module/common/query/useGetIPCountry";
import useIsMainnet from "module/settings/hook/useIsMainnet";
import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import Queries from "../../../query/queries";

export default function useIsBuyEnabled(): QueryResult<boolean> {
    const enableBuy = useConfig("enableBuy");
    const isMainnet = useIsMainnet();
    const { unsupportedCountries } = useConfig("transak");

    const { data: countryCode } = useGetIPCountry();

    return useQuery([Queries.IS_BUY_ENABLED, countryCode, unsupportedCountries, isMainnet], () => {
        const countrySupported =
            countryCode && !unsupportedCountries.some((country) => country.toLocaleLowerCase() === countryCode?.toLocaleLowerCase());

        return Boolean(enableBuy && isMainnet && countrySupported);
    });
}
