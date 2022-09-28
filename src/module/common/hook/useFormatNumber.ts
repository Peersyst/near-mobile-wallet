import settingsState from "module/settings/state/SettingsState";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import formatNumber, { FormatNumberOptions } from "utils/formatNumber";

export const useFormatNumber = (n: number | string, options?: FormatNumberOptions) => {
    const { locale } = useRecoilValue(settingsState);
    return useMemo(() => formatNumber(n, options, locale), [n, options, locale]);
};
