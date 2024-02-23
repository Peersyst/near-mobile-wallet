# NEAR Mobile Wallet locales

## How to add a new locale:

To add a new locale to the NEAR Mobile Wallet, follow these steps:

1. Add the translations of the new locale in the `/locales` folder.
2. In the file `langs.json`, include your new locale option alongside the existing translations.
3. Add the new locale to `i18n.types`.
4. Include the new resource in the `i18n` file.
5. Add the polyfill for the new locale in the `i18n` file.
6. Modify the `getDefaultLocale` function located in the `utils` folder.
7. Update the `SelectLocale` component within the `settings` module to allow users to switch to the new locale.
