/* eslint-disable @typescript-eslint/no-empty-interface */
import { StyleProp, TextStyle } from "react-native";
import { ThemeFonts, ThemeIcons, ThemePalette, ThemeZIndex } from "./theme.types";

export interface CreateDefaultThemeTypography {
    h1?: StyleProp<TextStyle>;
    h2?: StyleProp<TextStyle>;
    h3?: StyleProp<TextStyle>;
    h4?: StyleProp<TextStyle>;
    h5?: StyleProp<TextStyle>;
    h6?: StyleProp<TextStyle>;
    subtitle1?: StyleProp<TextStyle>;
    subtitle2?: StyleProp<TextStyle>;
    body1?: StyleProp<TextStyle>;
    body2?: StyleProp<TextStyle>;
    button?: StyleProp<TextStyle>;
    caption?: StyleProp<TextStyle>;
}
export interface CreateThemeTypography extends CreateDefaultThemeTypography {}

export type CreateThemePalette = Partial<ThemePalette>;

export interface CreateDefaultTheme {
    icons?: Partial<ThemeIcons>;
    typography?: CreateThemeTypography;
    fonts?: ThemeFonts;
    palette?: CreateThemePalette;
    shadows?: string[];
    borderRadius?: number;
    /*skeletonAnimations?: SkeletonAnimation;
    toastAnimation?: ToastAnimation;
    toastPosition?: ToastPosition;*/
    zIndex?: Partial<ThemeZIndex>;
    /*translate?: TranslateFn;*/
}
export interface CreateTheme extends CreateDefaultTheme {}
