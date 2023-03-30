import { CreateTheme } from "@peersyst/react-native-components";
import { TextStyle } from "react-native";

export type FontWeight = "strong" | "regular" | "light";

export const MANROPE: Record<FontWeight, string> = {
    light: "Manrope_300Light",
    regular: "Manrope_400Regular",
    strong: "Manrope_600SemiBold",
};

export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "body1" | "body2" | "body3" | "body4" | "caption";

export const FONT_STYLE: Record<TypographyVariant, TextStyle> = {
    h1: { fontSize: 48 },
    h2: { fontSize: 40 },
    h3: { fontSize: 32 },
    h4: { fontSize: 22 },
    body1: { fontSize: 18 },
    body2: { fontSize: 16 },
    body3: { fontSize: 14 },
    body4: { fontSize: 12 },
    caption: { fontSize: 10 },
};

export function createTypographyVariant(typographyVariant: TypographyVariant, fontWeight: FontWeight, style: TextStyle = {}): TextStyle {
    return {
        ...FONT_STYLE[typographyVariant],
        fontFamily: MANROPE[fontWeight],
        ...style,
    };
}

const typography: CreateTheme["typography"] = {
    h1Strong: createTypographyVariant("h1", "strong"),
    h1Regular: createTypographyVariant("h1", "regular"),
    h1Light: createTypographyVariant("h1", "light"),
    h2Strong: createTypographyVariant("h2", "strong"),
    h2Regular: createTypographyVariant("h2", "regular"),
    h2Light: createTypographyVariant("h2", "light"),
    h3Strong: createTypographyVariant("h3", "strong"),
    h3Regular: createTypographyVariant("h3", "regular"),
    h3Light: createTypographyVariant("h3", "light"),
    h4Strong: createTypographyVariant("h4", "strong"),
    h4Regular: createTypographyVariant("h4", "regular"),
    h4Light: createTypographyVariant("h4", "light"),
    body1Strong: createTypographyVariant("body1", "strong"),
    body1Regular: createTypographyVariant("body1", "regular"),
    body1Light: createTypographyVariant("body1", "light"),
    body2Strong: createTypographyVariant("body2", "strong"),
    body2Regular: createTypographyVariant("body2", "regular"),
    body2Light: createTypographyVariant("body2", "light"),
    body3Strong: createTypographyVariant("body3", "strong"),
    body3Regular: createTypographyVariant("body3", "regular"),
    body3Light: createTypographyVariant("body3", "light"),
    body4Strong: createTypographyVariant("body4", "strong"),
    body4Regular: createTypographyVariant("body4", "regular"),
    body4Light: createTypographyVariant("body4", "light"),
    captionStrong: createTypographyVariant("caption", "strong"),
    captionRegular: createTypographyVariant("caption", "regular"),
    captionLight: createTypographyVariant("caption", "light"),
};

export default typography;
