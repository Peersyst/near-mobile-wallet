import { FiatCurrency, Locale, Network, Settings } from "refactor/common/models";

export default class SettingsMock implements Settings {
    locale?: Locale;
    fiat?: FiatCurrency;
    network?: Network;
    biometrics?: boolean;

    constructor({ locale, fiat, network, biometrics }: Partial<Settings> = {}) {
        this.locale = locale;
        this.fiat = fiat;
        this.biometrics = biometrics;
        this.network = network;
    }
}
