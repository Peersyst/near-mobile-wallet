import Factory from "refactor/common/utils/Factory";
import { IBiometricsPreferencesRepository } from "./repository/IBiometricsPreferencesRepository";
import { IPinRepository } from "./repository/IPinRepository";
import PinRepository from "refactor/data-access/repository/auth/PinRepository";
import BiometricsPreferencesRepository from "refactor/data-access/repository/auth/BiometricsPreferencesRepository";

export interface IRepositoryFactory {
    pinRepository: IPinRepository;
    biometricsPreferencesRepository: IBiometricsPreferencesRepository;
}

export default Factory<IRepositoryFactory>({
    pinRepository: () => new PinRepository(),
    biometricsPreferencesRepository: () => new BiometricsPreferencesRepository(),
});
