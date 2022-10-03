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
        explorerLink: string;
        ckbTestnetUrl: string;
        indexerTestnetUrl: string;
        ckbMainnetUrl: string;
        indexerMainnetUrl: string;
        faucetUrl: string;
        testnetExplorerApi: string;
        mainnetExplorerApi: string;
        maxNumberOfDecimals: number;
        enableMainnet: boolean;
        tokenName: string;
    }

    export interface CreateConfig {
        backendUrl: string;
        minimumTransactionAmount: number;
        minimumDaoDeposit: number;
        explorerLink: string;
        ckbTestnetUrl: string;
        indexerTestnetUrl: string;
        ckbMainnetUrl: string;
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
}
