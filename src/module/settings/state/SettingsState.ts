import { FeeRate } from "ckb-peersyst-sdk";
import { atom } from "recoil";
import { Chain } from "module/common/service/CkbSdkService.types";
import { getDefaultLocale, LocaleType } from "locale";

export type FiatCurrencyType = "cny" | "usd" | "eur" | "jpy" | "gbp";

export type NetworkType = Chain;

export type FeeType = FeeRate.SLOW | FeeRate.NORMAL | FeeRate.FAST;

export interface SettingsState {
    locale?: LocaleType;
    fiat: FiatCurrencyType;
    network: NetworkType;
    fee: FeeType;
    loading?: boolean;
}

export const defaultSettingsState: SettingsState = { locale: getDefaultLocale(), fiat: "usd", network: "testnet", fee: FeeRate.NORMAL };

const settingsState = atom<SettingsState>({
    key: "settings",
    default: defaultSettingsState,
});

export default settingsState;
