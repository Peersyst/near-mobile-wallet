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

## 1.7.3

### 🎉 New Features

-   Add a `RefetchHandler` to improve the sync of the balance between the online/offline and the active/background states [feat/refetch-handler](https://github.com/Peersyst/near-mobile-wallet/pull/541)
-   Limit Transak to only in the countries that is supported [feat/limit-transak](https://github.com/Peersyst/near-mobile-wallet/pull/539)
-   Add `app version` in settings [feat/add-versions](https://github.com/Peersyst/near-mobile-wallet/pull/536)
-   Add actions in main app menu in [feat/main-button](https://github.com/Peersyst/near-mobile-wallet/pull/535)
-   Refactor explore dApps tab [refactor/explore-dapp](https://github.com/Peersyst/near-mobile-wallet/pull/533)

### 🐛 Bug Fixes

-   Fix dapps webview loading [fix/dapps-webview-loading](https://github.com/Peersyst/near-mobile-wallet/pull/548)
-   Fix account being duplicated when creating new account [fix/create-account-duplicated](https://github.com/Peersyst/near-mobile-wallet/pull/546)
-   Fix withdraw showing success when failing [fix/android-opening-default-browser](https://github.com/Peersyst/near-mobile-wallet/pull/545)
-   Fix Android opening default browser [fix/android-opening-default-browser](https://github.com/Peersyst/near-mobile-wallet/pull/544)
-   Improve UI of the explore section [fix/explore-ui-fixes](https://github.com/Peersyst/near-mobile-wallet/pull/543)
-   Get actions from the kitwallet api of NearBlocks [fix/actions-rate-limited](https://github.com/Peersyst/near-mobile-wallet/pull/540)
-   Fix SignerRequestModal not scrolling on Android [fix/signer-request-not-scrolling-on-android](https://github.com/Peersyst/near-mobile-wallet/pull/538)
-   Fix NFTs not being displayed in the APP [fix/nft-not-being-displayed](https://github.com/Peersyst/near-mobile-wallet/pull/537)

### 📚 Third-Party Library Updates

-   Add `@react-native-community/netinfo` in [feat/refetch-handler](https://github.com/Peersyst/near-mobile-wallet/pull/541)
