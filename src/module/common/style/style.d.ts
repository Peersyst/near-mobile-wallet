/* eslint-disable @typescript-eslint/no-empty-interface */
import "@peersyst/react-native-styled";
import { Theme as ExtendedTheme, Validator } from "react-native-components";
import { NetworkType } from "module/settings/state/SettingsState";

declare module "@peersyst/react-native-styled" {
    export interface Theme extends ExtendedTheme {}
}

declare module "react-native-components" {
    export interface ThemePalette {
        white: string;
        black: string;
        darkGray: string;
        darkLightGray: string;
        darkerGray: string;
        darkGray2: string;
        darkLightGray2: string;
        fullBlack: string;
        gray: string;
        lightGray: string;
        lighterGray: string;
        darkFont: string;
        turquoise: string;
        gold: string;
        violet: string;
        pink: string;
        blue: string;
        purple: string;
        red: string;
        appbar: string;
        paper: string;
        wallet: string[];
    }
    export interface TypographyVariantsOverrides {
        h4: false;
        h5: false;
        h6: false;
        subtitle1: false;
        subtitle2: false;
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
        tesnetTx: true;
    }
    export interface BlockchainLinks {
        address: undefined;
        tx: undefined;
        mainnetAddress: string;
        mainnetTx: string;
        testnetAddress: string;
        tesnetTx: string;
    }
}
