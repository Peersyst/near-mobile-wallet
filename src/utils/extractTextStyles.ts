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

export function extractTextStyles<T extends TextStyle>({
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
}: T): [TextStyle, Omit<T, ExtractedTextStyles>] {
    const textStyles = Object.create({
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
    });
    return [textStyles, rest];
}
