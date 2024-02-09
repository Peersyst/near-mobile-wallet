import { TransakOnRampQueryParams } from "@peersyst/react-native-transak-sdk";
import { DApp } from "module/signer/types";

export interface SignerFeatureConfig {
    enabled: boolean;
    backendUrl: string;
    dAppLogoFallback: string;
    recommendedDApps: DApp[];
}

export interface TransakConfig extends Omit<TransakOnRampQueryParams, "environment"> {
    environment: string;
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

export interface AnalyticsConfig {
    apiKey: string;
    host: string;
}

export interface Config {
    projectName: string;
    minimumTransactionAmount: number;
    indexerTestnetUrl: string;
    indexerMainnetUrl: string;
    mainnetExplorerLink: string;
    testnetExplorerLink: string;
    faucetUrl: string;
    maxNumberOfDecimals: number;
    enableChangeNetwork: boolean;
    tokenName: string;
    miniTokenUnit: string;
    mainnetNodeUrl: string;
    testnetNodeUrl: string;
    coingeckoTokenApiId: string;
    coingeckoUSDTApiId: string;
    minBalanceToCreateAccount: string;
    estimatedFee: string; //In NEAR
    enableIndexer: boolean;
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
    signerFeature: SignerFeatureConfig;
}
