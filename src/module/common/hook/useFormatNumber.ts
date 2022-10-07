import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import formatNumber, { FormatNumberOptions } from "utils/formatNumber";

export const useFormatNumber = (n: number | string, options?: FormatNumberOptions) => {
    const { locale } = useRecoilValue(settingsState);
    return formatNumber(n, options, locale);
};
