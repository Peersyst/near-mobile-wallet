import Factory from "refactor/common/utils/Factory";
import MnemonicRepository from "refactor/data-access/repository/wallet/mnemonic/MnemonicRepository";
import SettingsRepository from "refactor/data-access/repository/settings/SettingsRepository";
import PinRepository from "refactor/data-access/repository/auth/pin/PinRepository";
import BiometricsPreferencesRepository from "refactor/data-access/repository/auth/biometrics/BiometricsPreferencesRepository";
import { IBiometricsPreferencesRepository } from "./repository/IBiometricsPreferencesRepository";
import { IPinRepository } from "./repository/IPinRepository";
import { IMnemonicRepository } from "./repository/IMnemonicRepository";
import { ISettingsRepository } from "./repository/ISettingsRepository";

export interface IRepositoryFactory {
    pinRepository: IPinRepository;
    biometricsPreferencesRepository: IBiometricsPreferencesRepository;
    mnemonicRepository: IMnemonicRepository;
    settingsRepository: ISettingsRepository;
}

export default Factory<IRepositoryFactory>({
    pinRepository: () => new PinRepository(),
    biometricsPreferencesRepository: () => new BiometricsPreferencesRepository(),
    mnemonicRepository: () => new MnemonicRepository(),
    settingsRepository: () => new SettingsRepository(),
});
