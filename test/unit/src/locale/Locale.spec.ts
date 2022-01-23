import i18n from "i18n-js";

import { loadLocalization } from "locale";

describe("LocaleTest", () => {
    test("All keys are set in both languages", async () => {
        loadLocalization();

        const languages = i18n.translations;
        for (const language of Object.keys(languages)) {
            const languageTranslations = languages[language];
            for (const translationKey of Object.keys(languageTranslations)) {
                for (const comparingLanguage of Object.keys(languages)) {
                    expect((languages[comparingLanguage] as { [k in string]: unknown })[translationKey]).toBeDefined();
                }
            }
        }
        expect(true).toBeTruthy();
    });
});
