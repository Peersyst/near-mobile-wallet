import { TextStyle } from "react-native";

type ExtractedTextStyles =
    | "color"
    | "fontFamily"
    | "fontSize"
    | "fontStyle"
    | "fontWeight"
    | "letterSpacing"
    | "lineHeight"
    | "textAlign"
    | "textDecorationLine"
    | "textDecorationStyle"
    | "textDecorationColor"
    | "textShadowColor"
    | "textShadowOffset"
    | "textShadowRadius"
    | "textTransform"
    | "fontVariant"
    | "writingDirection"
    | "textAlignVertical"
    | "includeFontPadding";

// eslint-disable-next-line @typescript-eslint/ban-types
export function extractTextStyles<T extends TextStyle>(styles?: T): [TextStyle, Omit<T, ExtractedTextStyles> | {}] {
    if (!styles) return [{}, {}];
    const {
        color,
        fontFamily,
        fontSize,
        fontStyle,
        fontWeight,
        letterSpacing,
        lineHeight,
        textAlign,
        textDecorationLine,
        textDecorationStyle,
        textDecorationColor,
        textShadowColor,
        textShadowOffset,
        textShadowRadius,
        textTransform,
        fontVariant,
        writingDirection,
        textAlignVertical,
        includeFontPadding,
        ...rest
    } = styles;
    const textStyles = {
        color,
        fontFamily,
        fontSize,
        fontStyle,
        fontWeight,
        letterSpacing,
        lineHeight,
        textAlign,
        textDecorationLine,
        textDecorationStyle,
        textDecorationColor,
        textShadowColor,
        textShadowOffset,
        textShadowRadius,
        textTransform,
        fontVariant,
        writingDirection,
        textAlignVertical,
        includeFontPadding,
    };
    Object.keys(textStyles).forEach(
        (key) => textStyles[key as keyof typeof textStyles] === undefined && delete textStyles[key as keyof typeof textStyles],
    );

    return [textStyles, rest];
}
