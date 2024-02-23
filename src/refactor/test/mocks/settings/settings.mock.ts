import { FiatCurrencyType, NetworkType } from "module/common/types";
import { LocaleType } from "refactor/ui/locale";

export default class SettingsMock {
    public locale: LocaleType;
    public fiat: FiatCurrencyType;
    public biometrics: boolean;
    public network: NetworkType;

    constructor({ locale = "en", fiat = "usd", biometrics = true, network = "mainnet" } = {}) {
        this.locale = locale as LocaleType;
        this.fiat = fiat as FiatCurrencyType;
        this.biometrics = biometrics;
        this.network = network as NetworkType;
    }
}
