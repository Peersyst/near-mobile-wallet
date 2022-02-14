import { TextStyle, ViewStyle } from "react-native";
import useDefaultStyles from "./useDefaultStyles";
import { extractTextStyles } from "utils/extractTextStyles";
import { ButtonSize, ButtonStyles, ButtonVariant } from "../Button.types";
import { useMemo } from "react";

export interface UseButtonStylesResult {
    textStyle: TextStyle;
    rootStyle: ViewStyle;
}

export default function useButtonStyles(
    style: ButtonStyles,
    variant: ButtonVariant,
    size: ButtonSize,
    disabled: boolean,
    pressed: boolean,
): UseButtonStylesResult {
    const { defaultStyles, defaultDisabledStyles, defaultPressedStyles, defaultSizeStyles } = useDefaultStyles();
    const {
        disabled: { contained: containedDisabledStyles, text: textDisabledStyles, outlined: outlinedDisabledText, ...disabledStyles } = {},
        pressed: { contained: containedPressedStyles, text: textPressedStyles, outlined: outlinedPressedText, ...pressedStyles } = {},
        ...styles
    } = style;

    const [textStyles, rootStyles] = useMemo(() => extractTextStyles({ ...defaultStyles, ...styles }), [defaultStyles, styles]);
    const [disabledTextStyles, disabledRootStyles] = useMemo(
        () => extractTextStyles({ ...defaultDisabledStyles, ...disabledStyles }),
        [defaultDisabledStyles, disabledStyles],
    );

    const [variantDisabledTextStyles, variantDisabledRootStyles] = useMemo(() => {
        const disabledVariantStyles = { contained: containedDisabledStyles, text: textDisabledStyles, outlined: outlinedDisabledText };
        return extractTextStyles({
            ...defaultDisabledStyles[variant],
            ...disabledVariantStyles[variant],
        });
    }, [containedDisabledStyles, defaultDisabledStyles, outlinedDisabledText, textDisabledStyles, variant]);

    const [pressedTextStyles, pressedRootStyles] = useMemo(
        () => extractTextStyles({ ...defaultPressedStyles, ...pressedStyles }),
        [defaultPressedStyles, pressedStyles],
    );

    const [variantPressedTextStyles, variantPressedRootStyles] = useMemo(() => {
        const pressedVariantStyles = { contained: containedPressedStyles, text: textPressedStyles, outlined: outlinedPressedText };
        return extractTextStyles({
            ...defaultPressedStyles[variant],
            ...pressedVariantStyles[variant],
        });
    }, [containedPressedStyles, defaultPressedStyles, outlinedPressedText, textPressedStyles, variant]);

    const [variantTextStyles, variantRootStyles] = useMemo(
        () => extractTextStyles({ ...defaultStyles[variant], ...styles[variant] }),
        [defaultStyles, styles, variant],
    );

    console.log(variant, styles[variant]);

    const [sizeTextStyles, sizeRootStyles] = useMemo(
        () => extractTextStyles({ ...defaultSizeStyles[size], ...styles[size] }),
        [defaultSizeStyles, styles, size],
    );

    const textStyle = {
        ...textStyles,
        ...variantTextStyles,
        ...sizeTextStyles,
        ...(disabled && { ...disabledTextStyles, ...variantDisabledTextStyles }),
        ...(pressed && { ...pressedTextStyles, ...variantPressedTextStyles }),
    };
    const rootStyle = {
        ...rootStyles,
        ...variantRootStyles,
        ...sizeRootStyles,
        ...(disabled && { ...disabledRootStyles, ...variantDisabledRootStyles }),
        ...(pressed && { ...pressedRootStyles, ...variantPressedRootStyles }),
    };

    return { textStyle, rootStyle };
}
