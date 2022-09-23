import { CreateTheme } from "@peersyst/react-native-components";
import { TextStyle } from "react-native";

export type FontWeight = "strong" | "regular" | "light";

export const MANROPE: Record<FontWeight, string> = {
    light: "Manrope_300Light",
    regular: "Manrope_400Regular",
    strong: "Manrope_600SemiBold",
};

export const FONT_STYLE: Record<string, TextStyle> = {
    h1: { fontSize: 48, lineHeight: 56 },
    h2: { fontSize: 40, lineHeight: 50 },
    h3: { fontSize: 32, lineHeight: 40 },
    h4: { fontSize: 22, lineHeight: 32 },
    body1: { fontSize: 18, lineHeight: 30 },
    body2: { fontSize: 16, lineHeight: 28 },
    body3: { fontSize: 14, lineHeight: 20 },
    body4: { fontSize: 12, lineHeight: 18 },
};

export function createTypographyVariant(tag: keyof typeof FONT_STYLE, fontWeight: FontWeight, style: TextStyle = {}): TextStyle {
    return {
        ...FONT_STYLE[tag],
        fontFamily: MANROPE[fontWeight],
        ...style,
    };
}

const typography: CreateTheme["typography"] = {
    // CKBULL
    h1: {
        fontSize: 22,
    },
    h2: {
        fontSize: 18,
    },
    h3: {
        fontFamily: "Manrope_400Regular",
        fontSize: 16,
    },
    body1: {
        fontFamily: "Manrope_600SemiBold",
    },
    body2: {
        fontFamily: "Manrope_400Regular",
    },
    // NEAR
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
};

export default typography;
