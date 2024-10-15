import { useConfig } from "@peersyst/react-native-components";
import { getLocales } from "expo-localization";
import useIsMainnet from "module/settings/hook/useIsMainnet";
import { useMemo } from "react";

export default function useIsBuyEnabled(): boolean {
    const enableBuy = useConfig("enableBuy");
    const isMainnet = useIsMainnet();
    const locales = getLocales();
    const { unsupportedCountries } = useConfig("transak");

    const countryCode = locales[0]?.regionCode;

    const countrySupported = useMemo(
        () => !unsupportedCountries.some((country) => country.toLocaleLowerCase() === countryCode?.toLocaleLowerCase()),
        [countryCode, unsupportedCountries],
    );

    return enableBuy && isMainnet && countrySupported;
}
