import Factory from "refactor/common/utils/Factory";
import { IBiometricsService } from "./service/IBiometricsService";
import { ILocalizationService } from "./service/ILocalizationService";
import BiometricsService from "refactor/data-access/service/auth/BiometricsService";
import LocalizationService from "refactor/data-access/service/localization/LocalizationService";

export interface IServiceFactory {
    biometricsService: IBiometricsService;
    localizationService: ILocalizationService;
}

export default Factory<IServiceFactory>({
    biometricsService: () => new BiometricsService(),
    localizationService: () => new LocalizationService(),
});
