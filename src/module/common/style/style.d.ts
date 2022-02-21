/* eslint-disable @typescript-eslint/no-empty-interface */
import "@peersyst/react-native-styled";
import { Theme as ExtendedTheme } from "react-native-components";

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
    }
}
