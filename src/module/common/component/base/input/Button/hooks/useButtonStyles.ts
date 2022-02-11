import { TextStyle, ViewStyle } from "react-native";
import useDefaultStyles from "module/common/component/base/input/Button/hooks/useDefaultStyles";
import { extractTextStyles } from "utils/extractTextStyles";
import { ButtonSize, ButtonStyles, ButtonVariant } from "react-native-components";

export interface UseButtonStylesResult {
    textStyle: TextStyle;
    rootStyle: ViewStyle;
}

export default function useButtonStyles(
    styles: ButtonStyles,
    variant: ButtonVariant,
    size: ButtonSize,
    disabled: boolean,
    pressed: boolean,
): UseButtonStylesResult {
    const { defaultStyles, defaultDisabledStyles, defaultPressedStyles, defaultSizeStyles } = useDefaultStyles();

    const [textStyles, rootStyles] = extractTextStyles({ ...defaultStyles, ...styles });
    const [disabledTextStyles, disabledRootStyles] = extractTextStyles({ ...defaultDisabledStyles, ...styles.disabled });
    const [variantDisabledTextStyles, variantDisabledRootStyles] = extractTextStyles({
        ...defaultDisabledStyles[variant],
        ...styles.disabled?.[variant],
    });
    const [pressedTextStyles, pressedRootStyles] = extractTextStyles({ ...defaultPressedStyles, ...styles.pressed });
    const [variantPressedTextStyles, variantPressedRootStyles] = extractTextStyles({
        ...defaultPressedStyles[variant],
        ...styles.pressed?.[variant],
    });
    const [variantTextStyles, variantRootStyles] = extractTextStyles({ ...defaultStyles[variant], ...styles[variant] });
    const [sizeTextStyles, sizeRootStyles] = extractTextStyles({ ...defaultSizeStyles[size], ...styles[size] });

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
