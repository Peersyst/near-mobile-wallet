import createGlobalMock from "refactor/test/utils/createGlobalMock";
import * as ExpoLocalization from "expo-localization";
import MethodMock from "refactor/test/utils/MethodMock";

export const ExpoLocalizationGlobalMock = createGlobalMock(ExpoLocalization, {
    getLocales: new MethodMock("mockReturnValue", [{ languageCode: "es" }]),
} as any); //We add `any`here to avoid mocking all the ExpoLocalization methods as we only need to mock getLocales
