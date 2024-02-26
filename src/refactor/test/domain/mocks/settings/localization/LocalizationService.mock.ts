import { ILocalizationService } from "refactor/domain/adapter/service/ILocalizationService";
import createMock from "../../../../utils/createMock";
import MethodMock from "../../../../utils/MethodMock";

export default createMock<ILocalizationService>({
    getLocale: new MethodMock("mockResolvedValue", "en"),
});
