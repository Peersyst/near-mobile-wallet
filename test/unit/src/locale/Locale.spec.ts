import { resources } from "locale/i18n";
import { TestError } from "../../../utils/TestError";

describe("Test for the locales", () => {
    test("All locales have the same keys", () => {
        const { en, ...otherResources } = resources;

        //ex: [fr, de, es, ...]
        const langNames = Object.keys(otherResources);
        //ex: [{common: {key: value}, error: {key: value}, ...}, ...]
        const languages = Object.values(otherResources);
        //ex: [{key: value, key: value, ...}, {key: value, ...}, ...]
        const namespaces = Object.entries(en);

        //For each language
        for (const [index, translation] of languages.entries()) {
            // Check equal namespaces
            expect(Object.keys(translation)).toEqual(namespaces.map(([key]) => key));

            // For each translation, check equal keys
            for (const [namespace, values] of namespaces) {
                /*All keys of error */
                const translationValues = translation[namespace as keyof typeof translation];
                Object.keys(translationValues).forEach((key, line) => {
                    //eslint-disable-next-line no-prototype-builtins
                    const hasError = !values.hasOwnProperty(key);
                    if (hasError) {
                        throw new TestError(
                            `Error in locale ${langNames[index]} in ${
                                namespace === "translation" ? "common" : namespace
                            }.json with key ${key} in line ${line + 2}\nExpected key: '${
                                Object.keys(values)[line]
                            }' but received key: '${key}'
                        `,
                            "LocaleError",
                        );
                    }
                    expect(hasError).toBe(false);
                });
            }
        }
    });
});
