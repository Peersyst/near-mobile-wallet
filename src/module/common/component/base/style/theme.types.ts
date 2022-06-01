/* eslint-disable @typescript-eslint/no-empty-interface */
import { ShadowPropTypesIOSStatic, TextStyle } from "react-native";
import { ValidatorFactory, ValidatorKey } from "../input/TextInput/Validators";
import { JSXElementConstructor } from "react";
import { ToastAnimation, ToastPosition } from "../feedback/Toast";

export type PaletteMode = "light" | "dark";

export interface ThemeIcons {
    info: JSXElementConstructor<any>;
    error: JSXElementConstructor<any>;
    success: JSXElementConstructor<any>;
    warning: JSXElementConstructor<any>;
    invalid: JSXElementConstructor<any>;
    valid: JSXElementConstructor<any>;
    hide: JSXElementConstructor<any>;
    show: JSXElementConstructor<any>;
    cross: JSXElementConstructor<any>;
}

export type TypographyVariants =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button";
export interface TypographyVariantsOverrides {}
export interface DefaultThemeTypography {
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    h4: TextStyle;
    h5: TextStyle;
    h6: TextStyle;
    subtitle1: TextStyle;
    subtitle2: TextStyle;
    body1: TextStyle;
    body2: TextStyle;
    button: TextStyle;
    caption: TextStyle;
}
export interface ThemeTypography extends DefaultThemeTypography {}

export interface ThemeFonts {}

export interface DefaultThemePalette {
    mode: PaletteMode;
    primary: string;
    disabled: string;
    background: string;
    backdrop: string;
    text: string;
    status: {
        info: string;
        error: string;
        warning: string;
        success: string;
    };
}
export interface ThemePalette extends DefaultThemePalette {}

export type Shadow = ShadowPropTypesIOSStatic & { elevation?: number | undefined };

export interface DefaultThemeZIndex {
    header: number;
    popover: number;
    modal: number;
    selectMenu: number;
    toast: number;
}

export interface ThemeZIndex extends DefaultThemeZIndex {}

export interface ExtraValidators {}

export type BlockchainLinksTypes = "address" | "tx";
export interface BlockchainLinksTypesOverrides {}
export interface DefaultBlockchainLinks {
    address: string;
    tx: string;
}
export interface BlockchainLinks extends DefaultBlockchainLinks {}

export type TranslateKeys = ValidatorKey | "copied_to_clipboard";
export type TranslateFn<T extends TranslateKeys = TranslateKeys> = (w: T, opts?: Record<string, string>) => string;

export interface DefaultTheme {
    icons: ThemeIcons;
    typography: ThemeTypography;
    fonts?: ThemeFonts;
    palette: ThemePalette;
    shadows: Shadow[];
    borderRadius: number;
    toolbarHeight: number;
    /*skeletonAnimations: SkeletonAnimation;*/
    toastAnimation: ToastAnimation;
    toastPosition: ToastPosition;
    zIndex: ThemeZIndex;
    translate: TranslateFn;
    validators: Record<keyof ExtraValidators, ValidatorFactory<unknown>>;
    blockchainLinks: BlockchainLinks;
}
export interface Theme extends DefaultTheme {}
