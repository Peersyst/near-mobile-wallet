import Factory from "refactor/common/utils/Factory";
import { IBiometricsPreferencesRepository } from "./repository/IBiometricsPreferencesRepository";
import { IPinRepository } from "./repository/IPinRepository";
import PinRepository from "refactor/data-access/repository/auth/PinRepository";
import BiometricsPreferencesRepository from "refactor/data-access/repository/auth/BiometricsPreferencesRepository";
import { IMnemonicRepository } from "./repository/IMnemonicRepository";
import MnemonicRepository from "refactor/data-access/repository/auth/MnemonicRepository";
import { ISettingsRepository } from "./repository/ISettingsRepository";
import SettingRepository from "refactor/data-access/repository/settings/SettingsRepository";

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
    settingsRepository: () => new SettingRepository(),
});
