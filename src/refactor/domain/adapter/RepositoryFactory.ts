import Factory from "refactor/common/utils/Factory";
import { IBiometricsPreferencesRepository } from "./repository/IBiometricsPreferencesRepository";
import { IPinRepository } from "./repository/IPinRepository";
import PinRepository from "refactor/data-access/repository/auth/PinRepository";
import BiometricsPreferencesRepository from "refactor/data-access/repository/auth/BiometricsPreferencesRepository";
import { IMnemonicRepository } from "./repository/IMnemonicRepository";
import MnemonicRepository from "refactor/data-access/repository/auth/MnemonicRepository";

export interface IRepositoryFactory {
    pinRepository: IPinRepository;
    biometricsPreferencesRepository: IBiometricsPreferencesRepository;
    mnemonicRepository: IMnemonicRepository;
}

export default Factory<IRepositoryFactory>({
    pinRepository: () => new PinRepository(),
    biometricsPreferencesRepository: () => new BiometricsPreferencesRepository(),
    mnemonicRepository: () => new MnemonicRepository(),
});
