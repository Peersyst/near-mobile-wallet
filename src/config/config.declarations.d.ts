import "@peersyst/react-native-components";
import { Validator } from "@peersyst/react-native-components";
import { DApp } from "module/signer/types";
import { TransakOnRampQueryParams } from "module/transak";
import { TFunction } from "react-i18next";

export type EnvConfig = "test" | "development" | "production" | "staging";

export interface SignerFeatureConfig {
    enabled: boolean;
    backendUrl: string;
    recommendedDApps: DApp[];
    dAppLogoFallback: string;
}

export interface RefetchIntervals {
    //In ms
    nfts: number;
    tokens: number;
    balance: number;
    transactions: number;
    fiatPrice: number;
    stakingBalance: number;
    news: number;
    validators: number;
}

export interface SecurityQuizBackup {
    question: string;
    responses: string[];
    correctResponse: number;
}

export interface AnalyticsConfig {
    apiKey: string;
    host: string;
}

export interface TransakConfig extends Omit<TransakOnRampQueryParams, "environment"> {
    environment: string;
    unsupportedCountries: string[];
}

export interface ExploreDAppsConfig {
    exploreDAppsUrl: string;
    historyLimit: number;
}

export interface IntentsConfig {
    enabled: boolean;
    baseUrl: string;
    depositPath: string;
    withdrawPath: string;
    swapPath: string;
}

declare module "@peersyst/react-native-components" {
    export interface ConfigTypes {
        TranslateFn: TFunction<"error">;
    }

    export interface Config {
        appVersion: string;
        minimumTransactionAmount: number;
        nearblocksTesnetApiUrl: string;
        nearblocksMainnetApiUrl: string;
        mainnetExplorerLink: string;
        testnetExplorerLink: string;
        faucetUrl: string;
        maxNumberOfDecimals: number;
        enableChangeNetwork: boolean;
        tokenName: string;
        miniTokenUnit: string;
        mainnetNodeUrl: string;
        testnetNodeUrl: string;
        mainnetArchivalNodeUrl: string;
        testnetArchivalNodeUrl: string;
        coingeckoTokenApiId: string;
        coingeckoUSDTApiId: string;
        minBalanceToCreateAccount: string;
        estimatedFee: string; //In NEAR
        newsRSSUrl: string;
        defaultTwitterAccount: string;
        approveTxWaitTime: number; //In seconds
        testnetTokenPriceUrl: string;
        mainnetTokenPriceUrl: string;
        testnetSwapUrl: string;
        mainnetSwapUrl: string;
        intents: IntentsConfig;
        refetchIntervals: RefetchIntervals;
        indexerEstimatedDelay: number;
        nearMobileUrl: string;
        enableBuy: boolean;
        transak: TransakConfig;
        signerFeature: SignerFeatureConfig;
        analytics: AnalyticsConfig;
        enableManualImport: boolean;
        discordUrl: string;
        apiRequestTimeout: number;
        fastMainnetNearApiUrl: string;
        expoUpdatesEnabled: boolean;
        rpcList: {
            testnet: string[];
            mainnet: string[];
        };
        securityQuizList: SecurityQuizBackup[];
        quizNumberOfQuestions: number;
        exploreDApps: ExploreDAppsConfig;
        appUrlScheme: string;
    }

    export interface CreateConfig {
        appVersion: string;
        minimumTransactionAmount: number;
        nearblocksTesnetApiUrl: string;
        nearblocksMainnetApiUrl: string;
        mainnetExplorerLink: string;
        testnetExplorerLink: string;
        faucetUrl: string;
        maxNumberOfDecimals: number;
        enableChangeNetwork: boolean;
        tokenName: string;
        miniTokenUnit: string;
        mainnetNodeUrl: string;
        testnetNodeUrl: string;
        mainnetArchivalNodeUrl: string;
        testnetArchivalNodeUrl: string;
        coingeckoTokenApiId: string;
        coingeckoUSDTApiId: string;
        minBalanceToCreateAccount: string;
        estimatedFee: string;
        newsRSSUrl: string;
        defaultTwitterAccount: string;
        approveTxWaitTime: number; //In seconds
        testnetTokenPriceUrl: string;
        mainnetTokenPriceUrl: string;
        refetchIntervals: RefetchIntervals;
        indexerEstimatedDelay: number;
        nearMobileUrl: string;
        enableBuy: boolean;
        transak: TransakConfig;
        analytics: AnalyticsConfig;
        enableManualImport: boolean;
        telegramUrl: string;
        apiRequestTimeout: number;
        fastMainnetNearApiUrl: string;
        expoUpdatesEnabled: boolean;
        rpcList: {
            testnet: string[];
            mainnet: string[];
        };
        securityQuizList: SecurityQuizBackup[];
        quizNumberOfQuestions: number;
        exploreDApps: ExploreDAppsConfig;
        appUrlScheme: string;
    }

    export interface ExtraValidators {
        address: Validator;
        privateKey: Validator;
    }

    export interface BlockchainLinksTypesOverrides {
        address: false;
        tx: false;
        mainnetAddress: true;
        mainnetTx: true;
        testnetAddress: true;
        testnetTx: true;
    }
    export interface BlockchainLinks {
        address: undefined;
        tx: undefined;
        mainnetAddress: string;
        mainnetTx: string;
        testnetAddress: string;
        testnetTx: string;
    }
}
