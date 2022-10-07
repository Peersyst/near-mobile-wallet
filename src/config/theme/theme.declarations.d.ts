/* eslint-disable @typescript-eslint/no-empty-interface */
import "@peersyst/react-native-styled";
import { Theme as RNCTheme } from "@peersyst/react-native-components";

// Custom components theme
declare module "@peersyst/react-native-components" {
    export interface Theme {
        borderRadiusSm: number;
    }

    export interface CreateTheme {
        borderRadiusSm?: number;
    }

    export interface ThemePalette {
        // CKBULL
        white: string;
        black: string;
        darkGray: string;
        darkLightGray: string;
        darkerGray: string;
        darkGray2: string;
        darkLightGray2: string;
        fullBlack: string;
        lightGray: string;
        lighterGray: string;
        darkFont: string;
        turquoise: string;
        violet: string;
        pink: string;
        appbar: string;
        paper: string;
        wallet: string[];
        // NEAR
        gray: {
            0: string;
            100: string;
            300: string;
            600: string;
            900: string;
        };
        blue: string;
        green: string;
        gold: string;
        red: string;
        aqua: string;
        purple: string;
        lilac: string;
        orange: string;
        gradient: {
            lilacBlue: [string, string];
            lilacOrange: [string, string];
            lilacRed: [string, string];
            blueGreen: [string, string];
            blueTurquoise: [string, string];
            bluePurple: [string, string];
            purpleLilac: [string, string];
            purpleTurquoise: [string, string];
            purpleRed: [string, string];
            redOrange: [string, string];
            orangeYellow: [string, string];
            greenYellow: [string, string];
        };
        overlay: {
            "80%": string;
            "60%": string;
            "40%": string;
            "20%": string;
            "12%": string;
            "8%": string;
        };
        altOverlay: {
            "80%": string;
            "60%": string;
            "40%": string;
            "20%": string;
            "12%": string;
            "8%": string;
        };
    }

    export interface TypographyVariantsOverrides {
        h4: false;
        h5: false;
        h6: false;
        subtitle1: false;
        subtitle2: false;
        h1Strong: true;
        h1Regular: true;
        h1Light: true;
        h2Strong: true;
        h2Regular: true;
        h2Light: true;
        h3Strong: true;
        h3Regular: true;
        h3Light: true;
        h4Strong: true;
        h4Regular: true;
        h4Light: true;
        body1Strong: true;
        body1Regular: true;
        body1Light: true;
        body2Strong: true;
        body2Regular: true;
        body2Light: true;
        body3Strong: true;
        body3Regular: true;
        body3Light: true;
        body4Strong: true;
        body4Regular: true;
        body4Light: true;
    }
}

// Type styled components theme with our components theme
declare module "@peersyst/react-native-styled" {
    export interface Theme extends RNCTheme {}
}
