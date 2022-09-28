import "@peersyst/react-native-components";
import { Validator } from "@peersyst/react-native-components";
import { NetworkType } from "module/settings/state/SettingsState";
import { TFunction } from "react-i18next";

declare module "@peersyst/react-native-components" {
    export interface ConfigTypes {
        TranslateFn: TFunction<"error">;
    }

    export interface Config {
        backendUrl: string;
        minimumTransactionAmount: number;
        minimumDaoDeposit: number;
        mainnetExplorerLink: string;
        testnetExplorerLink: string;
        ckbTestnetUrl: string;
        nearTestnetUrl: string;
        indexerTestnetUrl: string;
        ckbMainnetUrl: string;
        nearMainnetUrl: string;
        indexerMainnetUrl: string;
        faucetUrl: string;
        testnetExplorerApi: string;
        mainnetExplorerApi: string;
        maxNumberOfDecimals: number;
        enableMainnet: boolean;
    }

    export interface CreateConfig {
        backendUrl: string;
        minimumTransactionAmount: number;
        minimumDaoDeposit: number;
        mainnetExplorerLink: string;
        testnetExplorerLink: string;
        ckbTestnetUrl: string;
        nearTestnetUrl: string;
        indexerTestnetUrl: string;
        ckbMainnetUrl: string;
        nearMainnetUrl: string;
        indexerMainnetUrl: string;
        faucetUrl: string;
        testnetExplorerApi: string;
        mainnetExplorerApi: string;
        maxNumberOfDecimals: number;
        enableMainnet: boolean;
    }

    export interface ExtraValidators {
        address: Validator<NetworkType>;
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
