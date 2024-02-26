import LocalizationService from "refactor/data-access/service/localization/LocalizationService";
import { ExpoLocalizationGlobalMock } from "../../mocks/expo-localization/ExpoLocalization.globalMock";

describe("LocalizationService", () => {
    let localizationService: LocalizationService;
    const expoLocalizationGlobalMock = new ExpoLocalizationGlobalMock();

    beforeEach(() => {
        expoLocalizationGlobalMock.clearMocks();
        localizationService = new LocalizationService();
    });

    describe("getLocale", () => {
        test("Gets the locale", async () => {
            expoLocalizationGlobalMock.getLocales.mockReturnValueOnce([{ languageCode: "es" }]);
            const locale = localizationService.getLocale();

            expect(locale).toEqual("es");
        });
    });
});
