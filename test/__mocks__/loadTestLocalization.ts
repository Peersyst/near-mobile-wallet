import i18n from "i18n-js";

export const loadTestLocalization = () => {
    // Set the key-value pairs for the different languages you want to support.
    i18n.translations = {
        en: require("locale/en.json"),
        es: require("locale/es.json"),
    };
    // Set the locale once at the beginning of your app.
    i18n.locale = "en";
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;
};
