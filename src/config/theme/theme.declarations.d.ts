/* eslint-disable @typescript-eslint/no-empty-interface */
import "@peersyst/react-native-styled";
import { Theme as RNCTheme } from "@peersyst/react-native-components";

export type PaletteGradient = [string, string];

// Custom components theme
declare module "@peersyst/react-native-components" {
    export interface Theme {
        borderRadiusSm: number;
        borderRadiusXs: number;
    }

    export interface CreateTheme {
        borderRadiusSm?: number;
        borderRadiusXs?: number;
    }

    export interface ThemePalette {
        white: string;
        black: string;
        gray: {
            "0": string;
            "100": string;
            "300": string;
            "600": string;
            "900": string;
        };
        blue: string;
        green: string;
        gold: string;
        red: string;
        aqua: string;
        purple: string;
        lilac: string;
        orange: string;
        wallet: PaletteGradient[];
        gradient: {
            lilacBlue: PaletteGradient;
            lilacOrange: PaletteGradient;
            lilacRed: PaletteGradient;
            blueGreen: PaletteGradient;
            blueTurquoise: PaletteGradient;
            bluePurple: PaletteGradient;
            purpleLilac: PaletteGradient;
            purpleTurquoise: PaletteGradient;
            purpleRed: PaletteGradient;
            redOrange: PaletteGradient;
            orangeYellow: PaletteGradient;
            greenYellow: PaletteGradient;
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
        component: {
            appbar: {
                backgroundColor: string;
            };
            navbar: {
                borderColor: string;
            };
            paper: string;
        };
    }

    export interface TypographyVariantsOverrides {
        h1: false;
        h2: false;
        h3: false;
        h4: false;
        h5: false;
        h6: false;
        body1: false;
        body2: false;
        subtitle1: false;
        subtitle2: false;
        button: false;
        caption: false;
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
