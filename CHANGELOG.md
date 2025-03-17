# Changelog

This document logs notable, developer-facing updates to the NEAR Mobile Wallet.

## Unpublished

### 📚 Third-Party Library Updates

-   Outline recent library updates here.

### 🛠 Breaking Changes

-   Detail any breaking changes impacting the wallet.

### 🎉 New Features

-   List new features added to enhance wallet functionality.

### 🐛 Bug Fixes

-   Document resolved bugs for improved performance and security.

## 1.8.7

### 🎉 New Features

-   Set `near-intents` as default url for swap.
-   Update config for intents
-   Change REF to RHEA

## 1.8.6

### 🐛 Bug Fixes

-   Fix `android` backup data bug

## 1.8.3 - 1.8.5

### 🐛 Bug Fixes

-   Update `eas.json`

## 1.8.2

### 🐛 Bug Fixes

-   Fix manual account import [fix/manual-account-import](https://github.com/Peersyst/near-mobile-wallet/pull/574)
-   Fix wrong schema for callback url [fix/sign-message-wrong-schema](https://github.com/Peersyst/near-mobile-wallet/pull/573)

## 1.8.1

### 🐛 Bug Fixes

-   Update config to limit transak and update DApps [fix/update-config](https://github.com/Peersyst/near-mobile-wallet/pull/566)
-   Update explore link [fix/exploreDAppsUrl](https://github.com/Peersyst/near-mobile-wallet/pull/565)

## 1.7.3

### 🎉 New Features

-   Update posthog events [refactor/update-posthog-events](https://github.com/Peersyst/near-mobile-wallet/pull/561)
-   Update dAppsList in the config [add-new-dapps-config](https://github.com/Peersyst/near-mobile-wallet/pull/560)
-   Add new currencies icons [add-near-coins](https://github.com/Peersyst/near-mobile-wallet/pull/553)
-   Add final DApps explore link [feat/update-explore-dapps-link](https://github.com/Peersyst/near-mobile-wallet/pull/550)
-   Block buy based on the IP [refactor/buy-ip-blocking](https://github.com/Peersyst/near-mobile-wallet/pull/549)
-   Add a `RefetchHandler` to improve the sync of the balance between the online/offline and the active/background states [feat/refetch-handler](https://github.com/Peersyst/near-mobile-wallet/pull/541)
-   Limit Transak to only in the countries that is supported [feat/limit-transak](https://github.com/Peersyst/near-mobile-wallet/pull/539)
-   Add `app version` in settings [feat/add-versions](https://github.com/Peersyst/near-mobile-wallet/pull/536)
-   Add actions in main app menu in [feat/main-button](https://github.com/Peersyst/near-mobile-wallet/pull/535)
-   Refactor explore dApps tab [refactor/explore-dapp](https://github.com/Peersyst/near-mobile-wallet/pull/533)

### 🐛 Bug Fixes

-   Update link of the geocalization service [fix/update-ip-geo-service](https://github.com/Peersyst/near-mobile-wallet/pull/559)
-   Update swap links for ref finance [refactor/ref-finance-links](https://github.com/Peersyst/near-mobile-wallet/pull/558)
-   Fix padding in news screen [fix/news-screen-padding](https://github.com/Peersyst/near-mobile-wallet/pull/557)
-   Fix website not reactive if comming from swap url [fix/web-view-not-reacting](https://github.com/Peersyst/near-mobile-wallet/pull/556)
-   Fix IOs WebView not ocuppying full height [refactor/base-page-padding](https://github.com/Peersyst/near-mobile-wallet/pull/555)
-   Fix ref finance web infinite loop loading [fix/loop-in-ref-finance-web-view](https://github.com/Peersyst/near-mobile-wallet/pull/552)
-   Fix dApps `onShouldStartLoadWithRequest` not working correctly on Android [feat/update-explore-dapps-link](https://github.com/Peersyst/near-mobile-wallet/pull/551)
-   Fix dapps webview loading [fix/dapps-webview-loading](https://github.com/Peersyst/near-mobile-wallet/pull/548)
-   Fix explore usabilty [fix/explore/usability-improvements](https://github.com/Peersyst/near-mobile-wallet/pull/547)
-   Fix account being duplicated when creating new account [fix/create-account-duplicated](https://github.com/Peersyst/near-mobile-wallet/pull/546)
-   Fix withdraw showing success when failing [fix/android-opening-default-browser](https://github.com/Peersyst/near-mobile-wallet/pull/545)
-   Fix Android opening default browser [fix/android-opening-default-browser](https://github.com/Peersyst/near-mobile-wallet/pull/544)
-   Improve UI of the explore section [fix/explore-ui-fixes](https://github.com/Peersyst/near-mobile-wallet/pull/543)
-   Get actions from the kitwallet api of NearBlocks [fix/actions-rate-limited](https://github.com/Peersyst/near-mobile-wallet/pull/540)
-   Fix SignerRequestModal not scrolling on Android [fix/signer-request-not-scrolling-on-android](https://github.com/Peersyst/near-mobile-wallet/pull/538)
-   Fix NFTs not being displayed in the APP [fix/nft-not-being-displayed](https://github.com/Peersyst/near-mobile-wallet/pull/537)

### 📚 Third-Party Library Updates

-   Add `@react-native-community/netinfo` in [feat/refetch-handler](https://github.com/Peersyst/near-mobile-wallet/pull/541)
