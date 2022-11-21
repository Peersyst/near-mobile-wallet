import "@peersyst/react-native-components";
import { Validator } from "@peersyst/react-native-components";
import { TFunction } from "react-i18next";

declare module "@peersyst/react-native-components" {
    export interface ConfigTypes {
        TranslateFn: TFunction<"error">;
    }

    export interface Config {
        minimumTransactionAmount: number;
        indexerTestnetUrl: string;
        indexerMainnetUrl: string;
        mainnetExplorerLink: string;
        testnetExplorerLink: string;
        faucetUrl: string;
        maxNumberOfDecimals: number;
        enableMainnet: boolean;
        tokenName: string;
        mainnetNodeUrl: string;
        testnetNodeUrl: string;
        coingeckoTokenApiId: string;
    }

    export interface CreateConfig {
        minimumTransactionAmount: number;
        indexerTestnetUrl: string;
        indexerMainnetUrl: string;
        mainnetExplorerLink: string;
        testnetExplorerLink: string;
        faucetUrl: string;
        maxNumberOfDecimals: number;
        enableMainnet: boolean;
        tokenName: string;
        mainnetNodeUrl: string;
        testnetNodeUrl: string;
        coingeckoTokenApiId: string;
    }

    export interface ExtraValidators {
        address: Validator;
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
